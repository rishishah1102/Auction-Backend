const express = require("express");
const profileController = require("../controllers/profileController");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const userOtpController = require("../controllers/userOtpController");
const verifyToken = require("../middlewares/auth");
const router = express.Router();


//SIGNUP || METHOD POST
router.post("/signup", registerController);

//USER INFO SAVE || METHOD POST
router.post("/signin", loginController);

//OTP PAGE TO SAVE USER || METHOD POST
router.post("/otp", userOtpController);

// PROFILE || METHOD POST
router.post("/profile",verifyToken, profileController);

module.exports = router;