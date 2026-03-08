const admin = require('../config/firebase-admin');
const db = admin.firestore();
const Joi = require('joi');

const assignSchema = Joi.object({
  gameId: Joi.string().required(),
  classId: Joi.string().required(),
  title: Joi.string().min(1).max(200).required(),
  dueDate: Joi.string().isoDate().required(),
  studentUids: Joi.array().items(Joi.string()),
});

// US03: Tạo bài tập mới
async function createAssignment(req, res, next) {
  try {
    const { error, value } = assignSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { gameId, classId, title, dueDate, studentUids } = value;

    // Nếu không truyền studentUids, lấy tất cả học sinh trong lớp
    let resolvedStudents = studentUids;
    if (!resolvedStudents || resolvedStudents.length === 0) {
      const classSnap = await db.collection('users')
        .where('role', '==', 'student')
        .where('classId', '==', classId)
        .get();
      resolvedStudents = classSnap.docs.map((d) => d.id);
    }

    const ref = db.collection('assignments').doc();
    const assignment = {
      assignmentId: ref.id,
      teacherUid: req.user.uid,
      gameId,
      classId,
      title,
      dueDate,
      studentUids: resolvedStudents,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    await ref.set(assignment);

    // Tạo status records cho từng học sinh
    const batch = db.batch();
    resolvedStudents.forEach((uid) => {
      const statusRef = db.collection('assignmentStatuses').doc(`${ref.id}_${uid}`);
      batch.set(statusRef, {
        assignmentId: ref.id,
        studentUid: uid,
        status: 'pending',
        sessionId: null,
        completedAt: null,
      });
    });
    await batch.commit();

    res.status(201).json({ assignmentId: ref.id });
  } catch (err) {
    next(err);
  }
}

// Danh sách bài tập của lớp
async function getClassAssignments(req, res, next) {
  try {
    const { classId } = req.params;
    const snap = await db.collection('assignments')
      .where('classId', '==', classId)
      .where('teacherUid', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const assignments = await Promise.all(snap.docs.map(async (d) => {
      const data = { assignmentId: d.id, ...d.data() };
      // Lấy tên game
      const gameSnap = await db.collection('games').doc(data.gameId).get();
      data.gameTitle = gameSnap.exists ? gameSnap.data().title : 'Unknown';
      return data;
    }));

    res.json(assignments);
  } catch (err) {
    next(err);
  }
}

// Bài tập của học sinh
async function getStudentAssignments(req, res, next) {
  try {
    const snap = await db.collection('assignments')
      .where('studentUids', 'array-contains', req.user.uid)
      .orderBy('dueDate', 'asc')
      .get();

    const assignments = snap.docs.map((d) => ({ assignmentId: d.id, ...d.data() }));
    res.json(assignments);
  } catch (err) {
    next(err);
  }
}

// Trạng thái bài tập (US03 AC: Chưa làm / Hoàn thành)
async function getAssignmentStatus(req, res, next) {
  try {
    const { assignmentId } = req.params;
    const snap = await db.collection('assignmentStatuses')
      .where('assignmentId', '==', assignmentId)
      .get();

    const statuses = snap.docs.map((d) => d.data());
    res.json(statuses);
  } catch (err) {
    next(err);
  }
}

module.exports = { createAssignment, getClassAssignments, getStudentAssignments, getAssignmentStatus };
