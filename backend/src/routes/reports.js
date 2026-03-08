const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');
const reportController = require('../controllers/reportController');

// GET /api/reports/class/:classId - Báo cáo cả lớp (US04)
router.get('/class/:classId', authenticateToken, requireRole('teacher'), reportController.getClassReport);

// GET /api/reports/assignment/:assignmentId - Báo cáo một bài tập
router.get('/assignment/:assignmentId', authenticateToken, requireRole('teacher'), reportController.getAssignmentReport);

// GET /api/reports/student/:studentUid - Chi tiết học sinh
router.get('/student/:studentUid', authenticateToken, requireRole('teacher'), reportController.getStudentReport);

module.exports = router;
