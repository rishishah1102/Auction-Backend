const mongoose = require("mongoose");
const userModel = require("../../models/userModel");
const playerModel = require("../../models/playerModel");
const matchModel = require("../../models/matchModel");

const addController = async (req, res) => {
  try {
    const player = {
      playerName: "Steve Smith",
      country: "Australia",
      currentTeam: "sinojiyaheet7@gmail.com",
      sellingPrice: 17,
      basePrice: 0.5,
      playerType: "All-Rounder",
    };

    const match = new matchModel({});
    const savedMatch = await match.save();

    if (savedMatch) {
      const players = new playerModel({
        ...player,
        match: savedMatch._id,
      });
      const savedplayer = await players.save();

      if (savedplayer) {
        const foundUser = await userModel.updateOne(
          { email: player.currentTeam },
          { $push: { squad: savedplayer._id } }
        );
        if (foundUser) {
          res.status(200).send({
            message: "Saved Data successfully",
            foundUser,
            savedplayer,
            savedMatch,
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Error in updating the user data",
          });
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Error in saving the players data",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Error in saving the match data",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in adding the data",
      error,
    });
  }
};

module.exports = addController;
