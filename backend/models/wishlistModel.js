const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    ref: 'User',
    type: mongoose.Schema.ObjectId,
    required: [true, 'A wishlist must belong to a user'],
  },

  game: {
    ref: 'Game',
    type: mongoose.Schema.ObjectId,
    required: [true, 'A wishlist must have a game'],
  },
});

wishlistSchema.index({ user: 1, game: 1 }, { unique: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
