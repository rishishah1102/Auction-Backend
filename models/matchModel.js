const mongoose = require("mongoose");
const matchSchema = require("../Schemas/matchSchema");

module.exports = mongoose.model("match", matchSchema);
