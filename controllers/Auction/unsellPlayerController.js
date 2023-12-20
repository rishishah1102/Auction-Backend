const playerModel = require("../../models/playerModel");

const unsellPlayerController = async (req, res) => {
  try {
    const { playerNumber } = req.body;
    const updatePlayer = await playerModel.updateOne(
      {
        playerNumber: playerNumber,
      },
      {
        $set: { unsold: true },
      }
    );
    if (updatePlayer) {
      res.status(200).send({ message: "Successfully unsold player" });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while sending",
      error,
    });
  }
};

module.exports = unsellPlayerController;
