const mongoose = require("mongoose");
// const userModel = require("../../models/userModel");
const playerModel = require("../../models/playerModel");
const matchModel = require("../../models/matchModel");

// Assuming mongoose connection is established elsewhere in your code

const addController = async (req, res) => {
  try {
    const playersData = req.body.aucPlayers;

    // Create an array of promises for saving players
    const savePlayersPromises = playersData.map(async (player) => {
      const match = new matchModel();
      const savedMatch = await match.save();

      if (savedMatch) {
        const newPlayer = new playerModel({
          ...player,
          match: savedMatch._id,
        });
        return newPlayer.save();
      } else {
        throw new Error("Error in saving the match data");
      }
    });

    // Wait for all player models to be saved
    const savedPlayers = await Promise.all(savePlayersPromises);

    if (savedPlayers) {
      res
        .status(201)
        .send({ message: "The players saved in db", success: true });
    } else {
      res
        .status(500)
        .send({ message: "There was a problem with saving the players" });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in adding the data",
      error: error.message || error,
    });
  }
};

module.exports = addController;
