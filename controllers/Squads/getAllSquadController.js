const playerModel = require("../../models/playerModel");

const getAllSquadController = async (req, res) => {
  const email = req.body.email;
  try {
    const squads = await playerModel.aggregate([
      {
        $match: {
          currentTeam: email,
        },
      },
      {
        $lookup: {
          from: "matches",
          localField: "match",
          foreignField: "_id",
          as: "matchData",
        },
      },
      {
        $unwind: "$matchData",
      },
      {
        $project: {
          _id: 0,
          playerData: "$$ROOT",
        },
      },
    ]);

    res.status(200).send({
      success: true,
      message: "Squad data fetched successfully",
      squads,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching the data",
      error,
    });
  }
};

module.exports = getAllSquadController;
