/**
 * reportController.js
 * US04: Giáo viên xem báo cáo - thống kê thời gian hoàn thành & số câu đúng/sai
 */
const admin = require('../config/firebase-admin');
const db = admin.firestore();

async function getAssignmentReport(req, res, next) {
  try {
    const { assignmentId } = req.params;

    // Lấy tất cả status của bài tập
    const statusSnap = await db.collection('assignmentStatuses')
      .where('assignmentId', '==', assignmentId)
      .get();

    const rows = await Promise.all(statusSnap.docs.map(async (d) => {
      const status = d.data();
      // Lấy thông tin học sinh
      const userSnap = await db.collection('users').doc(status.studentUid).get();
      const student = userSnap.exists ? userSnap.data() : {};

      let sessionData = {};
      if (status.sessionId) {
        const sessionSnap = await db.collection('gameSessions').doc(status.sessionId).get();
        if (sessionSnap.exists) sessionData = sessionSnap.data();
      }

      return {
        studentUid: status.studentUid,
        studentName: student.displayName || status.studentUid,
        status: status.status,
        score: sessionData.score ?? null,
        correctAnswers: sessionData.correctAnswers ?? null,
        wrongAnswers: sessionData.wrongAnswers ?? null,
        durationSeconds: sessionData.durationSeconds ?? null,
        completedAt: status.completedAt,
      };
    }));

    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getClassReport(req, res, next) {
  try {
    const { classId } = req.params;
    // Lấy tất cả sessions của học sinh trong lớp trong 30 ngày qua
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const classStudentsSnap = await db.collection('users')
      .where('role', '==', 'student')
      .where('classId', '==', classId)
      .get();

    const studentUids = classStudentsSnap.docs.map((d) => d.id);
    if (studentUids.length === 0) return res.json([]);

    // Batch query (Firestore giới hạn 10 per 'in' query)
    const chunks = [];
    for (let i = 0; i < studentUids.length; i += 10) {
      chunks.push(studentUids.slice(i, i + 10));
    }

    const allSessions = [];
    for (const chunk of chunks) {
      const snap = await db.collection('gameSessions')
        .where('studentUid', 'in', chunk)
        .where('completedAt', '>=', since)
        .get();
      allSessions.push(...snap.docs.map((d) => d.data()));
    }

    res.json(allSessions);
  } catch (err) {
    next(err);
  }
}

async function getStudentReport(req, res, next) {
  try {
    const { studentUid } = req.params;
    const snap = await db.collection('gameSessions')
      .where('studentUid', '==', studentUid)
      .orderBy('startedAt', 'desc')
      .limit(50)
      .get();

    const sessions = snap.docs.map((d) => ({ sessionId: d.id, ...d.data() }));
    res.json(sessions);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAssignmentReport, getClassReport, getStudentReport };
