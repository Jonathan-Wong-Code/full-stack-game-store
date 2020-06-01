const MyGames = require("../models/myGamesModel");
const catchAsync = require("../utils/catchAsync");

exports.addGameToMe = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  const ownedGame = await MyGames.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ownedGame,
    },
  });
});

exports.getMyGames = catchAsync(async (req, res, next) => {
  const myGames = await MyGames.find({ user: req.user.id }).populate({
    path: "game",
    select: "title imageCover",
  });

  res.status(200).json({
    status: "success",
    data: {
      myGames,
    },
  });
});
