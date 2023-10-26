const matchModel = require("../../models/matchModel");

const submissionController = async (req, res) => {
  try {
    const { xi, notXi } = req.body;

    await matchModel.updateMany({ _id: { $in: xi } }, { nextX1: true });

    await matchModel.updateMany({ _id: { $in: notXi } }, { nextX1: false });

    res.status(200).send({ message: "Next-XI updated", success: true });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in adding the data",
      error,
    });
  }
};

module.exports = submissionController;
