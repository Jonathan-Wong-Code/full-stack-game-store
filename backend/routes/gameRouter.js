const express = require('express');

const router = express.Router();
const {
  getGame,
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  getGameStats,
  addGameCoverImage,
  addGameGalleryImages,
} = require('../controllers/gameController');

const reviewRouter = require('./reviewRouter');
const { protect, restrictToRole } = require('../middleware/auth');

const {
  uploadGameImages,
  resizeGameImages,
} = require('../middleware/multerUploads');

const { dataUriGames } = require('../middleware/datauri');

router.use('/:gameId/reviews', reviewRouter);
router.route('/game-stats').get(getGameStats);

//localhost:3000/api/v1/games/:gameId/users

router
  .route('/')
  .get(getAllGames)
  .post(protect, restrictToRole('admin'), createGame);

router
  .route('/:id')
  .patch(
    protect,
    restrictToRole('admin'),
    uploadGameImages,
    resizeGameImages,
    dataUriGames,
    addGameCoverImage,
    addGameGalleryImages,
    updateGame
  )
  .delete(protect, restrictToRole('admin'), deleteGame)
  .get(getGame);

module.exports = router;
