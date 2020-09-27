const catchAsync = require('../utils/catchAsync');
const Wishlist = require('../models/wishlistModel');
const Game = require('../models/gameModel');

exports.addGameToWishlist = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  const wishlistItem = await Wishlist.create(req.body);
  const game = await Game.findById(wishlistItem.game);

  res.status(201).json({
    status: 'success',
    wishlistItem: game,
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
