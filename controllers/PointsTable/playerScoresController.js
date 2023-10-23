const playerModel = require("../../models/playerModel");

const playerScoresController = async (req, res) => {
  try {
    const email = req.body.email;

    const playerscores = await playerModel.aggregate([
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
      {
        $group: {
          _id: "$username",
          totalEp: { $sum: "$matchData.earnedPoints" },
          totalBp: { $sum: "$matchData.benchedPoints" },
          playerscores: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          username: "$_id",
          totalEp: 1,
          totalBp: 1,
          playerscores: 1,
        },
      },
    ]);

    if (playerscores.length > 0) {
      res.status(200).send({ success: true, playerscores: playerscores[0] });
    } else {
      res.status(404).send({
        success: false,
        message: "No data found for the given email.",
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

module.exports = playerScoresController;
