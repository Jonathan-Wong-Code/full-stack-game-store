const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const { uploader } = require("../middleware/cloudinary");
// ME CONTROLLERS //

const filterObj = (object, ...fieldsToUpdate) => {
  let filteredObject = {};
  Object.keys(object).forEach((field) => {
    if (fieldsToUpdate.includes(field)) filteredObject[field] = object[field];
  });

  return filteredObject;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This is not the route to update your password. Please try the /updatePassword route"
      ),
      400
    );
  }

  const filteredBody = filterObj(req.body, "name", "email");

  if (req.file) {
    const image = await uploader.upload(req.dUriFormattedFile, {
      eager: [{ width: 300, height: 300 }],
    });
    filteredBody.photoRegular = image.url;
    filteredBody.photoSmall = image.eager[0].url;
  }
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user.id,
    { active: false },
    { new: true, runValidators: true }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate("reviews")
    .populate({
      path: "myGames",
      populate: { path: "game" }, // sub populate to popualate games
    })
    .populate({ path: "wishlist", populate: "game" });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// GENERAL USER CONTROLLERS //

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
  });
});
