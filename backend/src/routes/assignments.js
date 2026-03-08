const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');
const assignmentController = require('../controllers/assignmentController');

// POST /api/assignments - Giáo viên tạo bài tập (US03)
router.post('/', authenticateToken, requireRole('teacher'), assignmentController.createAssignment);

// GET /api/assignments/class/:classId - DS bài tập của lớp
router.get('/class/:classId', authenticateToken, requireRole('teacher'), assignmentController.getClassAssignments);

// GET /api/assignments/student - DS bài tập của học sinh
router.get('/student', authenticateToken, requireRole('student'), assignmentController.getStudentAssignments);

// GET /api/assignments/:assignmentId/status - Trạng thái từng học sinh
router.get('/:assignmentId/status', authenticateToken, requireRole('teacher'), assignmentController.getAssignmentStatus);

module.exports = router;
