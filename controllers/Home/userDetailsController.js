const userModel = require("../../models/userModel");

const userDetailsController = async (req, res) => {
  try {
    const { email } = req.user.user;

    const foundUser = await userModel.findOne({ email: email });
    if (foundUser) {
      res.status(200).send({
        message: "Found the user",
        foundUser,
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

module.exports = userDetailsController;
