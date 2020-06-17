const Dislike = require('../models/dislikeModel');
const catchAsync = require('../utils/catchAsync');
const Like = require('../models/likeModel');

exports.addDislike = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.review) req.body.review = req.params.reviewId;

  const dislike = await Dislike.create(req.body);

  await Like.findOneAndDelete({
    user: req.user.id,
    review: req.params.reviewId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      dislike,
    },
  });
});

exports.removeDislike = catchAsync(async (req, res, next) => {
  await Dislike.findOneAndDelete({
    review: req.params.reviewId,
    user: req.user.id,
    _id: req.params.id,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
