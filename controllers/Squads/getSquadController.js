const playerModel = require("../../models/playerModel");
const userModel = require("../../models/userModel");

const getSquadController = async (req, res) => {
  let email = req.user.user.email;

  try {
    const findPlayer = await playerModel.findOne({ currentTeam: email });

    if (!findPlayer) {
      const findUser = await userModel.findOne({
        teamname: req.user.user.teamname,
      });
      email = findUser ? findUser.email : email;
    }

    const cursor = playerModel.aggregate([
      { $match: { currentTeam: email } },
      {
        $lookup: {
          from: "matches",
          localField: "match",
          foreignField: "_id",
          as: "matchData",
        },
      },
      { $unwind: "$matchData" },
      {
        $project: {
          _id: 0,
          playerData: "$$ROOT",
        },
      },
    ]);

    const squads = await cursor.exec();

    const purse = squads.reduce(
      (total, player) => total + player.playerData.sellingPrice,
      0
    );

    res.status(200).send({
      success: true,
      message: "Squad data fetched successfully",
      squads,
      purse,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in fetching the data",
      error,
    });
  }
};

module.exports = getSquadController;
