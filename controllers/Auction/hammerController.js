const playerModel = require("../../models/playerModel");

const hammerController = async (req, res) => {
  try {
    const { hammerType } = req.body;
    let players;

    if (hammerType === "Unsold") {
      players = await playerModel.find({ unsold: true });
    } else {
      players = await playerModel.find({ sold: false, unsold: false });
    }

    if (players && players.length > 0) {
      // Sort players in ascending order of playerNumber
      players.sort((a, b) => a.playerNumber - b.playerNumber);

      res.status(200).send({ message: "Found Players", players });
    } else {
      res.status(200).send({ message: "No Players Found", players: [] });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while sending",
      error,
    });
  }
};

module.exports = hammerController;
