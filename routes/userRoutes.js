const express = require("express");

// player adding
const addController = require("../controllers/AddPlayerinDB/addController");

// profile
const profileController = require("../controllers/Profile/profileController");

// auth
const registerController = require("../controllers/Auth/registerController");
const loginController = require("../controllers/Auth/loginController");
const loginOtpController = require("../controllers/Auth/loginOtpController");
const userOtpController = require("../controllers/Auth/userOtpController");

// home
const userDetailsController = require("../controllers/Home/userDetailsController");

// points table
const getUserPtController = require("../controllers/PointsTable/getUserPtController");
const leaderBoardController = require("../controllers/PointsTable/leaderBoardController");
const scoreBoardController = require("../controllers/PointsTable/scoreBoardController");
const playerScoresController = require("../controllers/PointsTable/playerScoresController");
const updateScoresController = require("../controllers/PointsTable/updateScoresController");
const changexiController = require("../controllers/PointsTable/changexiController");

// players
const getAllPlayerController = require("../controllers/Players/getAllPlayerController");

// squads
const getSquadController = require("../controllers/Squads/getSquadController");
const getAllSquadController = require("../controllers/Squads/getAllSquadController");

// submission
const submissionController = require("../controllers/Weekly-Team/submissionController");

// middlewares
const verifyToken = require("../middlewares/auth");
const router = express.Router();

// All Request Controllers

// Player ADDING || METHOD POST
router.post("/addplayer", addController);

// SIGNUP || METHOD POST
router.post("/signup", registerController);

// USER INFO SAVE || METHOD POST
router.post("/signin", loginController);

// OTP PAGE TO SAVE USER || METHOD POST
router.post("/otp", userOtpController);

// OTP PAGE TO SAVE USER || METHOD POST
router.post("/loginotp", loginOtpController);

// PROFILE || METHOD POST
router.post("/profile", verifyToken, profileController);

// HOME || METHOD GET
router.get("/home", verifyToken, userDetailsController);

// POINTSTABLE || METHOD GET
router.get("/pointstable", verifyToken, getUserPtController);

// LEADERBOARD || METHOD GET
router.get("/leaderboard", verifyToken, leaderBoardController);

// SCOREBOARD || METHOD GET
router.get("/scoreboard", verifyToken, scoreBoardController);

// PLAYERSCORES || METHOD POST
router.post("/playerscores", verifyToken, playerScoresController);

// UPDATEPLAYERSCORES || METHOD POST
router.post("/updatescores", verifyToken, updateScoresController);

// CHANGEXI || METHOD POST
router.post("/changexi", verifyToken, changexiController);

// ALL PLAYERS || METHOD GET
router.get("/players", verifyToken, getAllPlayerController);

// ALL SQUAD || METHOD GET
router.get("/squads", verifyToken, getSquadController);

// ALL SQUAD || METHOD POST
router.post("/squads", verifyToken, getAllSquadController);

// SUBMISSION || METHOD POST
router.post("/submission", verifyToken, submissionController);

module.exports = router;
