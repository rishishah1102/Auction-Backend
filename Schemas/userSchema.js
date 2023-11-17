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
    default: "--",
  },
  teamname: {
    type: String,
    required: true,
    default: "--",
  },
  squad: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  isPlaying: {
    type: Boolean,
    default: false,
  },
  isAuctioneer: {
    type: Boolean,
    default: false,
  },
});

module.exports = userSchema;
