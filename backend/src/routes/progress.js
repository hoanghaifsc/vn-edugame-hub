const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');
const progressController = require('../controllers/progressController');

// GET /api/progress/overview - Dashboard tổng quan phụ huynh (US05)
router.get('/overview', authenticateToken, requireRole('parent'), progressController.getOverview);

// GET /api/progress/weekly - Tiến độ môn học hàng tuần
router.get('/weekly', authenticateToken, requireRole('parent'), progressController.getWeeklyProgress);

module.exports = router;
