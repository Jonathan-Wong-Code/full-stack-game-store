const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.game) req.body.game = req.params.gameId;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    review,
  });
});

exports.getAllReviewsPerGame = catchAsync(async (req, res, next) => {
  // const reviews = await Review.find({
  //   game: req.params.gameId,
  // }).populate({ path: 'likes' });

  const reviewQuery = Review.find({
    game: req.params.gameId,
  });

  const query = new APIFeatures(reviewQuery, req.query)
    .filter()
    .sort()
    .paginate();

  const reviews = await query.queryObj;

  res.status(200).json({
    status: 'success',
    reviews,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOne({
    user: req.user.id,
    _id: req.params.reviewId,
  });

  res.status(200).json({
    status: 'success',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    {
      user: req.user.id,
      _id: req.params.reviewId,
    },
    req.body,
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    review,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndDelete({
    user: req.user.id,
    _id: req.params.reviewId,
  });

  if (!review) {
    return next(
      new AppError('Invalid User. You did not write this review', 401)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
