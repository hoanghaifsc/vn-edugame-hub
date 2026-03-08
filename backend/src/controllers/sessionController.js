const admin = require('../config/firebase-admin');
const db = admin.firestore();

/**
 * POST /api/sessions
 * Tạo game session mới
 */
async function createSession(req, res, next) {
  try {
    const { gameId, assignmentId } = req.body;
    if (!gameId) return res.status(400).json({ error: 'gameId is required' });

    const sessionRef = db.collection('gameSessions').doc();
    const session = {
      sessionId: sessionRef.id,
      studentUid: req.user.uid,
      gameId,
      assignmentId: assignmentId || null,
      startedAt: admin.firestore.FieldValue.serverTimestamp(),
      completedAt: null,
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      durationSeconds: 0,
      syncStatus: 'synced',
      offlineCreated: false,
    };
    await sessionRef.set(session);
    res.status(201).json({ sessionId: sessionRef.id });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/sessions/:sessionId
 * Cập nhật kết quả session
 */
async function updateSession(req, res, next) {
  try {
    const { sessionId } = req.params;
    const sessionRef = db.collection('gameSessions').doc(sessionId);
    const snap = await sessionRef.get();

    if (!snap.exists) return res.status(404).json({ error: 'Session not found' });
    if (snap.data().studentUid !== req.user.uid) {
      return res.status(403).json({ error: 'Not your session' });
    }

    const { score, correctAnswers, wrongAnswers, durationSeconds } = req.body;
    await sessionRef.update({
      score: score ?? 0,
      correctAnswers: correctAnswers ?? 0,
      wrongAnswers: wrongAnswers ?? 0,
      totalQuestions: (correctAnswers ?? 0) + (wrongAnswers ?? 0),
      durationSeconds: durationSeconds ?? 0,
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Cập nhật assignment status nếu có
    if (snap.data().assignmentId) {
      await updateAssignmentStatus(snap.data().assignmentId, req.user.uid, sessionId);
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/sessions/sync
 * Đồng bộ các sessions được tạo offline (US02)
 * Input: single session object hoặc { sessions: [] }
 */
async function syncSessions(req, res, next) {
  try {
    const sessions = Array.isArray(req.body.sessions) ? req.body.sessions : [req.body];
    const results = { synced: [], failed: [] };

    const batch = db.batch();
    for (const session of sessions) {
      if (!session.sessionId || !session.gameId) {
        results.failed.push({ sessionId: session.sessionId, reason: 'Missing required fields' });
        continue;
      }
      // Bảo vệ: chỉ sync session của chính user
      if (session.studentUid && session.studentUid !== req.user.uid) {
        results.failed.push({ sessionId: session.sessionId, reason: 'UID mismatch' });
        continue;
      }

      const ref = db.collection('gameSessions').doc(session.sessionId);
      batch.set(ref, {
        ...session,
        studentUid: req.user.uid, // Enforce correct UID
        syncStatus: 'synced',
        syncedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      results.synced.push(session.sessionId);
    }

    await batch.commit();

    // Cập nhật assignment statuses
    for (const session of sessions) {
      if (session.assignmentId && results.synced.includes(session.sessionId)) {
        await updateAssignmentStatus(session.assignmentId, req.user.uid, session.sessionId);
      }
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
}

async function updateAssignmentStatus(assignmentId, studentUid, sessionId) {
  const statusRef = db
    .collection('assignmentStatuses')
    .doc(`${assignmentId}_${studentUid}`);
  await statusRef.set({
    assignmentId,
    studentUid,
    sessionId,
    status: 'completed',
    completedAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
}

module.exports = { createSession, updateSession, syncSessions };
