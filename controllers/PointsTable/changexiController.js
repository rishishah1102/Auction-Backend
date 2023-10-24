const matchModel = require("../../models/matchModel");

const changexiController = async (req, res) => {
  try {
    // Fetch current documents first
    const currentMatches = await matchModel.find({});

    if (currentMatches) {
      // Perform updates on each document
      const updatedMatches = currentMatches.map((match) => {
        return matchModel.updateOne(
          { _id: match._id }, // Use a unique identifier, such as _id
          {
            $set: {
              prevBenchedPoints: match.benchedPoints,
              prevEarnedPoints: match.earnedPoints,
              prevTotalPoints: match.totalPoints,
              match1: 0,
              match2: 0,
              match3: 0,
              match4: 0,
              match5: 0,
              match6: 0,
              match7: 0,
              match8: 0,
              match9: 0,
              match10: 0,
              prevX1: match.currentX1,
              currentX1: match.nextX1,
            },
          }
        );
      });

      // Execute all update operations
      await Promise.all(updatedMatches);

      // Send a success response
      res
        .status(200)
        .json({ message: "Records updated successfully.", success: true });
    } else {
      // Handle the case where no documents were found
      res
        .status(404)
        .json({ message: "No documents found for updating.", success: false });
    }
  } catch (err) {
    console.error("Error updating records:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = changexiController;
