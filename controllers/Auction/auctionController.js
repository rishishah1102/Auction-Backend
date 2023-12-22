const playerModel = require("../../models/playerModel");
const userModel = require("../../models/userModel");

const auctionController = async (req, res) => {
  try {
    const auctionData = await userModel.aggregate([
      {
        $match: { isPlaying: true },
      },
      {
        $lookup: {
          from: "players",
          localField: "squad",
          foreignField: "_id",
          as: "squadDetails",
        },
      },
      {
        $project: {
          username: 1,
          ImgUrl: 1,
          teamname: 1,
          overseas: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $ne: ["$squadDetails", []] },
                    {
                      $ne: [
                        { $arrayElemAt: ["$squadDetails.country", 0] },
                        "India",
                      ],
                    },
                  ],
                },
                1,
                0,
              ],
            },
          },
          purseUsed: {
            $ifNull: [{ $sum: "$squadDetails.sellingPrice" }, 0],
          },
          boughtPlayers: { $size: "$squad" }, // New field
        },
      },
    ]);

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
