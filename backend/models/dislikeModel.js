const mongoose = require("mongoose");

const dislikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, "A like must have a user"],
    },

    review: {
      type: mongoose.Schema.ObjectId,
      required: [true, "A like must belong to a review"],
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

dislikeSchema.index({ user: 1, review: 1 }, { unique: true });

module.exports = mongoose.model("Dislike", dislikeSchema);

// On like....findAndDelete dislike and vice versa
