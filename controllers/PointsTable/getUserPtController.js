const userModel = require("../../models/userModel");

const getUserPtController = async (req, res) => {
  try {
    // const { email } = req.user.user;

    const aucPlayers = await userModel.find();
    if (aucPlayers) {
      res.status(200).send({
        message: "Found the user",
        aucPlayers,
      });
    }
  } catch (error) {
    res.status(500).send({
        success: false,
        message: "Error in fetching the data",
        error,
    });
  }
};

module.exports = getUserPtController;
