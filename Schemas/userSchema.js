const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ImgUrl: {
    type: String,
    required: true,
    default: "your image",
  },
  teamname: {
    type: String,
    required: true,
    default: "your team",
  },
  squad: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  auctions: {
    type: Array,
  },
  squadScores: {
    type: Array,
  },
  isAuctioneer: {
    type: Boolean,
  },
});

module.exports = userSchema;
