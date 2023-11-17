const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerNumber: {
    type: Number,
    required: true,
  },
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
    default: "--",
  },
  prevTeam: {
    type: String,
    required: true,
    default: "--",
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
    default: 0,
  },
  currentFantasyPoints: {
    type: Number,
    required: true,
    default: 0,
  },
  sellingPrice: {
    type: Number,
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
  unsold: {
    type: Boolean,
    default: false,
  },
});

module.exports = playerSchema;
