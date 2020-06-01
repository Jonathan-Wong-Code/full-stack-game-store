const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "An order must have a user"],
  },

  games: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Game",
      required: [true, "An order must include games"],
    },
  ],

  total: {
    type: Number,
    trim: true,
    required: [true, "An order must have a total"],
  },

  tax: {
    type: Number,
    trim: true,
    required: [true, "An order must have tax"],
  },

  totalWithTax: {
    type: Number,
    trim: true,
    required: [true, "An order must have a total"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
