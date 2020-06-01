const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.game) req.body.game = req.params.gameId;

  const review = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.getAllReviewsPerGame = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({
    user: req.user.id,
    game: req.params.gameId,
  }).populate({ path: "likes" });

  res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOne({
    user: req.user.id,
    game: req.params.gameId,
    _id: req.params.reviewId,
  });

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    {
      user: req.user.id,
      game: req.params.gameId,
      _id: req.params.reviewId,
    },
    req.body,
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  await Review.findOneAndDelete({
    user: req.user.id,
    game: req.params.gameId,
    _id: req.params.reviewId,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
