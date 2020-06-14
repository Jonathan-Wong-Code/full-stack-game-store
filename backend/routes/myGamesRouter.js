const express = require('express');

const { addGameToMe, getMyGames } = require('../controllers/myGamesController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.route('/').post(addGameToMe).get(getMyGames);

module.exports = router;
