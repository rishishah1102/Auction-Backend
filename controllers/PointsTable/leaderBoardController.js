const userModel = require("../../models/userModel");
const playerModel = require("../../models/playerModel");
const matchModel = require("../../models/matchModel");

const leaderBoardController = async (req, res) => {
  try {
    const leaderboard = await userModel.aggregate([
      {
        $lookup: {
          from: "players", // Name of the player collection
          localField: "squad",
          foreignField: "_id",
          as: "squadPlayers",
        },
      },
      {
        $unwind: "$squadPlayers",
      },
      {
        $lookup: {
          from: "matches", // Name of the match collection
          localField: "squadPlayers.match",
          foreignField: "_id",
          as: "playerMatches",
        },
      },
      {
        $unwind: "$playerMatches",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$username" },
          ep: { $sum: "$playerMatches.earnedPoints" },
          bep: { $sum: "$playerMatches.benchedPoints" },
        },
      },
      {
        $sort: { ep: -1 },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          ep: 1,
          bep: 1,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      leaderboard: leaderboard,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching the data",
      error,
    });
  }
};

module.exports = leaderBoardController;
