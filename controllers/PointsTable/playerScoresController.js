const playerModel = require("../../models/playerModel");

const playerScoresController = async (req, res) => {
  try {
    const { email } = req.body;
    const scoreboard = await playerModel.aggregate([
      {
        $match: {
          currentTeam: email,
        },
      },
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

module.exports = playerScoresController;
