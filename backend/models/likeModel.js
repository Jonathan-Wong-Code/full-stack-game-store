const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'A like must have a user'],
  },

  review: {
    type: mongoose.Schema.ObjectId,
    required: [true, 'A like must belong to a review'],
  },
});

likeSchema.index({ user: 1, review: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);

// On like....findAndDelete dislike and vice versa
