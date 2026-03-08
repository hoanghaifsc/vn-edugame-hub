const admin = require('../config/firebase-admin');
const db = admin.firestore();

async function listGames(req, res, next) {
  try {
    const { subject } = req.query;
    let query = db.collection('games').where('isActive', '==', true);
    if (subject) query = query.where('subject', '==', subject);

    const snap = await query.get();
    const games = snap.docs.map((d) => ({ gameId: d.id, ...d.data() }));
    res.json(games);
  } catch (err) {
    next(err);
  }
}

async function getGame(req, res, next) {
  try {
    const snap = await db.collection('games').doc(req.params.gameId).get();
    if (!snap.exists) return res.status(404).json({ error: 'Game not found' });
    res.json({ gameId: snap.id, ...snap.data() });
  } catch (err) {
    next(err);
  }
}

module.exports = { listGames, getGame };
