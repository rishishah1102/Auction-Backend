const playerModel = require("../../models/playerModel");

const scoreBoardController = async (req, res) => {
  try {
    const scoreboard = await playerModel.aggregate([
      {
        $lookup: {
          from: "matches", // Assuming the name of the match collection is "matches"
          localField: "match",
          foreignField: "_id",
          as: "matchData",
        },
      },
      {
        $unwind: "$matchData",
      },
      {
        $lookup: {
          from: "users", // Assuming the name of the user collection is "users"
          localField: "currentTeam",
          foreignField: "email",
          as: "userData",
        },
      },
      {
        $unwind: "$userData",
      },
      {
        $project: {
          _id: 0,
          username: "$userData.username",
          name: "$playerName",
          country: "$country",
          matchData: 1, // Include the entire match data
        },
      },
      {
        $sort: {
          "matchData.totalPoints": -1,
        },
      },
    ]);

    res.status(200).send({ success: true, scoreboard });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching the data",
      error,
    });
  }
};

module.exports = scoreBoardController;
