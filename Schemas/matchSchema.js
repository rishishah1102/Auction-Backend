const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  match1: {
    type: Number,
    default: 0,
  },
  match2: {
    type: Number,
    default: 0,
  },
  match3: {
    type: Number,
    default: 0,
  },
  match4: {
    type: Number,
    default: 0,
  },
  match5: {
    type: Number,
    default: 0,
  },
  match6: {
    type: Number,
    default: 0,
  },
  match7: {
    type: Number,
    default: 0,
  },
  match8: {
    type: Number,
    default: 0,
  },
  match9: {
    type: Number,
    default: 0,
  },
  match10: {
    type: Number,
    default: 0,
  },
  prevX1: {
    type: Boolean,
    default: false,
  },
  currentX1: {
    type: Boolean,
    default: false,
  },
  nextX1: {
    type: Boolean,
    default: false,
  },
  earnedPoints: {
    type: Number,
    default: 0,
  },
  benchedPoints: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
});

module.exports = matchSchema;
