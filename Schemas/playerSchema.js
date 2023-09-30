const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  playerType: {
    type: String,
    required: true,
  },
  iplTeam: {
    type: String,
    required: true,
  },
  prevTeam: {
    type: String,
    required: true,
  },
  currentTeam: {
    type: String,
    required: true,
    default: "--",
  },
  basePrice: {
    type: Number,
    required: true,
  },
  prevFantasyPoints: {
    type: Number,
    required: true,
  },
  currentFantasyPoints: {
    type: Number,
    required: true,
    default: 0,
  },
  sellingPrice: {
    type: Number,
  },
});

module.exports = playerSchema;
