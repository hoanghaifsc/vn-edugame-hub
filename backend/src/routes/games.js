const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const gameController = require('../controllers/gameController');

// GET /api/games?subject=math
router.get('/', authenticateToken, gameController.listGames);

// GET /api/games/:gameId
router.get('/:gameId', authenticateToken, gameController.getGame);

module.exports = router;
