const express = require('express');

const { protect } = require('../middleware/auth');
const {
  createReview,
  getAllReviewsPerGame,
  getReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const likesRouter = require('./likesRouter');
const dislikesRouter = require('./dislikesRouter');

const router = express.Router({ mergeParams: true });

router.use('/:reviewId/likes', likesRouter);
router.use('/:reviewId/dislikes', dislikesRouter);

router.route('/').post(protect, createReview).get(getAllReviewsPerGame);

router
  .route('/:reviewId')
  .get(getReview)
  .patch(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
