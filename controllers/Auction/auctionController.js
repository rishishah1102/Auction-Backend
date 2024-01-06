const playerModel = require("../../models/playerModel");
const userModel = require("../../models/userModel");

const auctionController = async (req, res) => {
  try {
    const findUsers = await userModel.find({ isPlaying: true }).lean();

    let auctionData = await Promise.all(
      findUsers.map(async (user) => {
        let boughtPlayers = 0;
        let overseas = 0;
        let purseUsed = 0;

        if (user.squad.length > 0) {
          const squadPlayerIds = user.squad.map((playerId) => playerId.toString());
          const squadPlayers = await playerModel.find({ _id: { $in: squadPlayerIds } }).lean();

          squadPlayers.forEach((foundPlayer) => {
            if (foundPlayer.country !== "India") {
              overseas += 1;
            }
            boughtPlayers += 1;
            purseUsed += foundPlayer.sellingPrice;
          });
        }

        return {
          username: user.username,
          teamname: user.teamname,
          ImgUrl: user.ImgUrl,
          purseUsed,
          overseas,
          boughtPlayers,
        };
      })
    );

    res.status(200).send({
      success: true,
      message: "Auction data fetched successfully",
      auction: auctionData,
    });
  } catch (error) {
    console.error("Error while processing auction:", error);
    res.status(500).send({
      success: false,
      message: "Error while processing auction",
      error,
    });
  }
};

module.exports = auctionController;
