const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Please enter an email'],
      trim: true,
      unique: [true, 'An account already exists with that email'],
    },

    photoRegular: String,
    photoSmall: String,

    password: {
      type: String,
      required: [true, 'Please enter a password'],
      trim: true,
      minlength: [8, 'Password must be at least 8 characters'],
    },

    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      trim: true,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: 'Passwords do not match. Try again!',
      },
    },

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('myGames', {
  ref: 'MyGames',
  foreignField: 'user',
  localField: '_id',
});

userSchema.virtual('wishlist', {
  ref: 'Wishlist',
  foreignField: 'user',
  localField: '_id',
});

// Document Middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Query middleware
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Instance methods.
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt.getTime) {
    console.log(JWTTimestamp);
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  // False means not changed.
  return false;
};

userSchema.methods.createResetPasswordToken = function () {
  const token = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 + 60 + 1000;

  return token;
};

userSchema.methods.toJSON = function () {
  const returnedObj = this.toObject();

  delete returnedObj.password;
  delete returnedObj.passwordConfirm;
  delete returnedObj.passwordResetToken;
  delete returnedObj.passwordResetExpires;
  delete returnedObj.passwordChangedAt;

  return returnedObj;
};

module.exports = mongoose.model('User', userSchema);
