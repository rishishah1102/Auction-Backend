const matchModel = require("../../models/matchModel");

const updateScoresController = async (req, res) => {
  try {
    const score = req.body;
    const foundMatch = await matchModel.findById(score.mid);

    const updateData = {};
    for (let i = 1; i <= 10; i++) {
      const matchKey = `match${i}`;
      if (foundMatch[matchKey] !== score[matchKey]) {
        updateData[matchKey] = parseInt(score[matchKey]);
        updateData.totalPoints =
          foundMatch.totalPoints +
          parseInt(score[matchKey]);

        const pointsKey = foundMatch.currentX1
          ? "earnedPoints"
          : "benchedPoints";
        // const benchkey =
        //   pointsKey === "earnedPoints"
        //     ? "prevEarnedPoints"
        //     : "prevBenchedPoints";
        updateData[pointsKey] =
          foundMatch[pointsKey] +
          parseInt(score[matchKey]);

        await matchModel.findByIdAndUpdate(score.mid, updateData);
      }
    }

    res.status(200).send({
      success: true,
      message: "Score updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching the data",
      error,
    });
  }
};

module.exports = updateScoresController;
