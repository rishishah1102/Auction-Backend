const mongoose = require('mongoose');
const playerSchema = require('../Schemas/playerSchema');

module.exports = mongoose.model("player", playerSchema);