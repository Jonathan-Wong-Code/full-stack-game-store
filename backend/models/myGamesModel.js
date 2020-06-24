const mongoose = require('mongoose');

// This is like a Mongoose table join that gets referenced by the virtuals
const MyGamesSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.ObjectId,
      ref: 'Game',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

MyGamesSchema.index({ user: 1, game: 1 }, { unique: true });

module.exports = mongoose.model('MyGames', MyGamesSchema);
