const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');
const Email = require('../utils/email');

const createSendToken = (user, res, statusCode, req) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
  });

  const jwtOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.cookie('jwt', token, jwtOptions);

  res.status(statusCode).json({
    status: 'success',
    user,
    token,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const newEmail = new Email(newUser, 'Welcome and thanks for joining!');
  await newEmail.sendWelcome();

  createSendToken(newUser, res, 201, req);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, res, 200, req);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError('No account found associated with that email', 404)
    );
  }
  //Want unhashed
  const resetToken = user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const message = `Forgot your password ? Head over to http://localhost:3000/resetPassword/${resetToken} to reset password. This expires in 10 minutes`;

  const newEmail = new Email(user, message);

  await newEmail.resetPassword();

  res.status(200).json({
    status: 'success',
    message: 'Password reset email sent',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { updatedPassword, updatedPasswordConfirm } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({ passwordResetToken: hashedToken });
  if (!user) {
    return next(new AppError('Reset token invalid. Please try again', 404));
  }

  user.password = updatedPassword;
  user.passwordConfirm = updatedPasswordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, res, 200, req);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, updatedPassword, updatedPasswordConfirm } = req.body;

  const passwordMatches = await req.user.correctPassword(currentPassword);
  if (!passwordMatches) {
    return next(new AppError('Incorrect password! Please try again', 401));
  }

  req.user.password = updatedPassword;
  req.user.passwordConfirm = updatedPasswordConfirm;
  await req.user.save();

  createSendToken(req.user, res, 200, req);
});
