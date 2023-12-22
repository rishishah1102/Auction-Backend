const getSquadController = async (req, res) => {
  let email = req.user.user.email;

  try {
    const findPlayer = await playerModel.findOne({ email: email });

    if (!findPlayer) {
      const findUser = await userModel.findOne({
        teamname: req.user.user.teamname,
      });
      email = findUser ? findUser.email : email;
    }

    const squads = await playerModel
      .aggregate([
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
      ])
      .lean(); // Use lean for better performance

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
    res.status(500).send({
      success: false,
      message: "Error in fetching the data",
      error,
    });
  }
};

module.exports = getSquadController;
