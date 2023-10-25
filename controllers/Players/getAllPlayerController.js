const playerModel = require("../../models/playerModel");

const getAllPlayerController = async (req, res) => {
  try {
    const foundPlayers = await playerModel.find();
    if (!foundPlayers || foundPlayers.length === 0) {
      res.status(404).send({ message: "No players found" });
    } else {
      res.status(200).send({ success: true, foundPlayers });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching the data",
      error,
    });
  }
};

module.exports = getAllPlayerController;
