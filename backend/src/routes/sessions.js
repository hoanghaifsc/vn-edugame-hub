const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');
const sessionController = require('../controllers/sessionController');

// POST /api/sessions - Tạo session mới
router.post('/', authenticateToken, requireRole('student'), sessionController.createSession);

// PUT /api/sessions/:sessionId - Cập nhật tiến trình
router.put('/:sessionId', authenticateToken, requireRole('student'), sessionController.updateSession);

// POST /api/sessions/sync - Batch sync offline sessions (US02)
router.post('/sync', authenticateToken, requireRole('student'), sessionController.syncSessions);

module.exports = router;
