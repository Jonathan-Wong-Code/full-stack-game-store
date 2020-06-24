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

    // Represented as a JS date.
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

    // Discount represents the amount taken off total price.
    discount: {
      type: Number,
      default: 0,
    },

    genre: {
      type: [String],
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
          'Racing',
          'Moba',
          'RTS',
        ],

        message:
          'A game must have a genre of Action, FPS, RPG, Strategy, MMORPG, Sports, Simulation, Puzzle, Adventure, RTS, Moba, Racing',
      },
    },

    // Images
    imageCover: {
      type: String,
      default: '',
    },

    imageCoverMobile: {
      type: String,
      default: '',
    },

    cardPhoto: {
      type: String,
      default: '',
    },

    galleryImages: {
      type: [String],
      default: [],
    },

    mobileImages: {
      type: [String],
      default: [],
    },
    thumbnails: {
      type: [String],
      default: [],
    },

    // isFeatured denotes that it appears in the front end carousel
    isFeatured: {
      type: Boolean,
      default: false,
    },
    // isFrontPage denotes if the game should appear on the front page or not.
    isFrontPage: {
      type: Boolean,
      default: false,
    },
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
