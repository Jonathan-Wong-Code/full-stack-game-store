const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

exports.protect = catchAsync(async (req, res, next) => {
  let token = {};
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.replace('Bearer ', '');
  } else {
    token = null;
  }

  console.log(token);

  if (!token) {
    return next(new AppError('You are not logged in. Please login', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded) {
    return next(new AppError('Invalid login token. Please login!', 401));
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError('This account no longer exists!', 404));
  }

  if (await user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed their password! Please login again!',
        401
      )
    );
  }

  req.user = user;
  next();
});

exports.restrictToRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to do that'), 403);
    }
    next();
  };
};
