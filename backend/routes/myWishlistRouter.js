const express = require('express');

const {
  addGameToWishlist,
  removeGameFromWishlist,
  getMyWishlist,
} = require('../controllers/wishlistController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/').post(addGameToWishlist).get(getMyWishlist);

router.route('/:gameId').delete(removeGameFromWishlist);

module.exports = router;
