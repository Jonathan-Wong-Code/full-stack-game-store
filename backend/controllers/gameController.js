const Game = require('../models/gameModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const { uploader } = require('../middleware/cloudinary');

exports.createGame = catchAsync(async (req, res, next) => {
  const newGame = await Game.create(req.body);

  res.status(201).json({
    message: 'success',
    result: newGame,
  });
});

exports.getAllGames = catchAsync(async (req, res, next) => {
  const query = new APIFeatures(Game.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate();

  const games = await query.queryObj;

  res.status(201).json({
    message: 'success',
    result: games,
  });
});

exports.getGame = catchAsync(async (req, res, next) => {
  const game = await Game.findById(req.params.id).populate({
    path: 'reviews',
    select: '',
  });
  res.status(201).json({
    message: 'success',
    result: game,
  });
});

exports.deleteGame = catchAsync(async (req, res, next) => {
  await Game.findByIdAndDelete(req.params.id);
  res.status(204).json({
    message: 'success',
    results: null,
  });
});

exports.updateGame = catchAsync(async (req, res, next) => {
  const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    message: 'success',
    result: game,
  });
});

exports.getGameStats = catchAsync(async (req, res, next) => {
  const stats = await Game.aggregate([
    {
      $match: {},
    },
    {
      $group: {
        _id: '$genre',
        avgRating: { $avg: '$rating' },
        num: { $sum: 1 },
      },
    },
    {
      $sort: { avgRating: -1 },
    },
  ]);
  res.status(200).json({
    message: 'success',
    result: stats,
  });
});

exports.addGameCoverImage = catchAsync(async (req, res, next) => {
  if (req.imageCover) {
    const image = await uploader.upload(req.imageCover, {
      eager: [
        {
          height: 160,
          width: 320,
        },
      ],
    });
    req.body.imageCover = image.url;
    req.body.cardPhoto = image.eager[0].url;
  }

  next();
});

// Middleware to upload images to cloudinary. Add image arrays to request object.

exports.addGameGalleryImages = catchAsync(async (req, res, next) => {
  if (req.images) {
    const images = req.images.map((image) =>
      uploader.upload(
        image,
        {
          eager: [
            { width: 486, height: 274 },
            { width: 271, height: 152 },
          ],
        },
        function (error, result) {
          console.log(result, error);
        }
      )
    );
    const resolvedImages = await Promise.all(images);
    req.body.galleryImages = resolvedImages.map((image) => image.url);
    req.body.mobileImages = resolvedImages.map((image) => image.eager[0].url);
    req.body.thumbnails = resolvedImages.map((image) => image.eager[1].url);
  }

  next();
});
