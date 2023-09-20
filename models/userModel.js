const mongoose = require('mongoose');
const userSchema = require('../Schemas/userSchema');

module.exports = mongoose.model("user", userSchema);