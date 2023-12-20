const playerModel = require("../../models/playerModel");
const userModel = require("../../models/userModel");

const sellPlayerController = async (req, res) => {
  try {
    const { playerId, currentTeam, sellingPrice, prevTeam } = req.body;

    const session = await playerModel.startSession();
    session.startTransaction();

    try {
      await playerModel.updateOne(
        { _id: playerId },
        {
          $set: {
            currentTeam,
            sellingPrice,
            prevTeam,
            sold: true,
            unsold: false,
          },
        },
        { session }
      );

      await userModel.updateOne(
        { email: currentTeam },
        { $push: { squad: playerId } },
        { session }
      );

      await session.commitTransaction();

      res
        .status(200)
        .send({ message: "Successfully updated squad", success: true });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while sending",
      error: error.message,
    });
  }
};

module.exports = sellPlayerController;
