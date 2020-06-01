const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A game must have a title'],
      trim: true,
      unique: [true, 'A title must be unique'],
    },

    averageRating: {
      type: Number,
      min: [1, 'A game must have a rating of at least 1'],
      max: [5, 'A game cannot have a rating of over 5'],
      set: (value) => Math.round(value * 10) / 10, // rounds to nearest one decimal
    },

    operatingSystems: {
      type: [String],
      default: ['Windows(7,8,10)'],
      required: [true, 'A game must have an operating system'],
    },

    releaseDate: {
      type: Date,
      default: Date.now(),
    },

    company: {
      type: String,
      required: [true, 'A game must have a company'],
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      required: [true, 'A game must have a description'],
      trim: true,
      minlength: [5, 'Description must have at least 5 characters'],
    },

    price: {
      type: Number,
      default: 60.0,
      min: [1, 'A game must have a price of at least 1 dollar'],
      required: [true, 'Game must have a price'],
    },

    discount: {
      type: Number,
      default: 0,
    },

    genre: {
      type: String,
      required: [true, 'A game must have a genre'],
      enum: {
        values: [
          'Action',
          'FPS',
          'RPG',
          'Strategy',
          'MMORPG',
          'Sports',
          'Simulation',
          'Puzzle',
          'Adventure',
          'Fighting',
        ],

        message:
          'A game must have a genre of Action, FPS, RPG, Strategy, MMORPG, Sports, Simulation, Puzzle, or Adventure',
      },
    },
    imageCover: String,
    cardPhoto: String,
    galleryImages: [String],
    mobileImages: [String],
    thumbnails: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

gameSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'game',
  localField: '_id',
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
