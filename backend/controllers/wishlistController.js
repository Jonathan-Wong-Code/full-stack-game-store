const catchAsync = require('../utils/catchAsync');
const Wishlist = require('../models/wishlistModel');

exports.addGameToWishlist = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  const game = await Wishlist.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      game,
    },
  });
});

exports.removeGameFromWishlist = catchAsync(async (req, res, next) => {
  await Wishlist.findOneAndDelete({
    game: req.params.gameId,
    user: req.user.id,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMyWishlist = catchAsync(async (req, res, next) => {
  // Populate wishlist with title and imageCover
  const myWishlist = await Wishlist.find({ user: req.user.id }).populate({
    path: 'game',
    select: 'title imageCover',
  });

  res.status(200).json({
    status: 'success',
    data: {
      myWishlist,
    },
  });
});
