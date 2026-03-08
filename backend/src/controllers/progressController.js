/**
 * progressController.js
 * US05: Phụ huynh theo dõi tiến độ
 */
const admin = require('../config/firebase-admin');
const db = admin.firestore();

async function getOverview(req, res, next) {
  try {
    const parentUid = req.user.uid;
    // Lấy linkedStudentUid từ profile phụ huynh
    const userSnap = await db.collection('users').doc(parentUid).get();
    const studentUid = userSnap.data()?.linkedStudentUid;
    if (!studentUid) return res.status(400).json({ error: 'No linked student' });

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const sessionsSnap = await db.collection('gameSessions')
      .where('studentUid', '==', studentUid)
      .where('startedAt', '>=', weekAgo)
      .get();

    const sessions = sessionsSnap.docs.map((d) => d.data());
    const completedSessions = sessions.filter((s) => s.completedAt);

    const weeklyOnlineMinutes = Math.floor(
      sessions.reduce((sum, s) => sum + (s.durationSeconds || 0), 0) / 60
    );

    const averageScore = completedSessions.length > 0
      ? completedSessions.reduce((sum, s) => sum + (s.score || 0), 0) / completedSessions.length
      : null;

    // Đếm assignment
    const assignSnap = await db.collection('assignmentStatuses')
      .where('studentUid', '==', studentUid)
      .get();
    const totalAssignments = assignSnap.size;
    const completedAssignments = assignSnap.docs.filter(
      (d) => d.data().status === 'completed'
    ).length;

    res.json({
      weeklyOnlineMinutes,
      gamesPlayedThisWeek: sessions.length,
      averageScore,
      totalAssignments,
      completedAssignments,
    });
  } catch (err) {
    next(err);
  }
}

async function getWeeklyProgress(req, res, next) {
  try {
    const parentUid = req.user.uid;
    const userSnap = await db.collection('users').doc(parentUid).get();
    const studentUid = userSnap.data()?.linkedStudentUid;
    if (!studentUid) return res.status(400).json({ error: 'No linked student' });

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    // Lấy sessions 2 tuần để so sánh xu hướng
    const snap = await db.collection('gameSessions')
      .where('studentUid', '==', studentUid)
      .where('startedAt', '>=', twoWeeksAgo)
      .get();

    const allSessions = snap.docs.map((d) => d.data());

    // Group theo môn học
    const subjectMap = {};
    const subjectLabels = { math: 'Toán', vietnamese: 'Tiếng Việt', science: 'Khoa học' };

    // Cần join với games collection để lấy subject
    const gameIds = [...new Set(allSessions.map((s) => s.gameId))];
    const gameSubjects = {};
    for (const gameId of gameIds) {
      const gSnap = await db.collection('games').doc(gameId).get();
      if (gSnap.exists) gameSubjects[gameId] = gSnap.data().subject;
    }

    for (const session of allSessions) {
      const subject = gameSubjects[session.gameId] || 'other';
      const isThisWeek = new Date(session.startedAt?.toDate?.() || session.startedAt) >= weekAgo;

      if (!subjectMap[subject]) {
        subjectMap[subject] = { thisWeek: [], lastWeek: [] };
      }
      if (isThisWeek) {
        subjectMap[subject].thisWeek.push(session);
      } else {
        subjectMap[subject].lastWeek.push(session);
      }
    }

    const result = Object.entries(subjectMap).map(([subject, data]) => {
      const thisWeekAvg = data.thisWeek.length
        ? data.thisWeek.reduce((s, x) => s + (x.score || 0), 0) / data.thisWeek.length
        : 0;
      const lastWeekAvg = data.lastWeek.length
        ? data.lastWeek.reduce((s, x) => s + (x.score || 0), 0) / data.lastWeek.length
        : 0;

      return {
        subject,
        subjectLabel: subjectLabels[subject] || subject,
        sessionsCount: data.thisWeek.length,
        totalMinutes: data.thisWeek.reduce((s, x) => s + (x.durationSeconds || 0), 0) / 60,
        averageScore: thisWeekAvg || null,
        trend: thisWeekAvg > lastWeekAvg ? 'up' : thisWeekAvg < lastWeekAvg ? 'down' : 'stable',
      };
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { getOverview, getWeeklyProgress };
