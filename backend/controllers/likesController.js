const catchAsync = require('../utils/catchAsync');
const Like = require('../models/likeModel');
const Dislike = require('../models/dislikeModel');

exports.addLike = catchAsync(async (req, res, next) => {
  if (!req.body.review) req.body.review = req.params.reviewId;
  if (!req.body.user) req.body.user = req.user.id;
  const like = await Like.create(req.body);

  await Dislike.findOneAndDelete({
    review: req.params.reviewId,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: { like },
  });
});

exports.removeLike = catchAsync(async (req, res, next) => {
  await Like.findOneAndDelete({
    review: req.params.reviewId,
    user: req.user.id,
    _id: req.params.id,
  });

  res.status(204).json({
    status: 'success',
  });
});
