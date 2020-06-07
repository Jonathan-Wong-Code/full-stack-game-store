const mongoose = require('mongoose');
const Game = require('./gameModel');

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A review must have a title'],
      trim: true,
    },

    rating: {
      type: Number,
      required: [true, 'A review must have a rating'],
      min: [1, 'A review must have a rating of at least 1'],
      max: [5, 'A review cannot have a rating of more than 5'],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      required: [true, 'A review must have a date'],
    },

    description: {
      type: String,
      required: [true, 'A review must have a description'],
    },

    helpful: {
      type: 'String',
      enum: {
        values: ['yes', 'no'],
        message: 'Helpful values must be yes or no',
      },
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must be written by a user'],
    },

    game: {
      type: mongoose.Schema.ObjectId,
      ref: 'Game',
      required: [true, 'A review must belong to a game'],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

reviewSchema.index({ user: 1, game: 1 }, { unique: true });

reviewSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'review',
  localField: '_id',
});

reviewSchema.virtual('dislikes', {
  ref: 'Dislike',
  foreignField: 'review',
  localField: '_id',
});

reviewSchema.statics.calcAverageRating = async function (gameId) {
  const stats = await this.aggregate([
    {
      $match: { game: gameId },
    },
    {
      $group: {
        _id: '$game',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats) {
    await Game.findByIdAndUpdate(
      gameId,
      {
        ratingsQuantity: stats[0].nRating,
        averageRating: stats[0].avgRating,
      },
      { new: true, runValidators: true }
    );
  } else {
    await Game.findByIdAndUpdate(
      gameId,
      {
        ratingsQuantity: 0,
        averageRating: null,
      },
      { new: true, runValidators: true }
    );
  }
};

reviewSchema.post('save', async function (doc, next) {
  await doc.constructor.calcAverageRating(doc.game);
  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.find()
    .populate({ path: 'user', select: 'name photo' })
    .populate({ path: 'likes', select: '-_id -__v' })
    .populate({ path: 'dislikes', select: '' });

  next();
});

module.exports = mongoose.model('Review', reviewSchema);
