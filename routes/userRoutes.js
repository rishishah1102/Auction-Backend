const express = require("express");

// profile
const profileController = require("../controllers/Profile/profileController");

// auth
const registerController = require("../controllers/Auth/registerController");
const loginController = require("../controllers/Auth/loginController");
const loginOtpController = require("../controllers/Auth/loginOtpController");
const userOtpController = require("../controllers/Auth/userOtpController");

// home
const userDetailsController = require("../controllers/Home/userDetailsController");

// middlewares
const verifyToken = require("../middlewares/auth");
const router = express.Router();

//SIGNUP || METHOD POST
router.post("/signup", registerController);

//USER INFO SAVE || METHOD POST
router.post("/signin", loginController);

//OTP PAGE TO SAVE USER || METHOD POST
router.post("/otp", userOtpController);

//OTP PAGE TO SAVE USER || METHOD POST
router.post("/loginotp", loginOtpController);

// PROFILE || METHOD POST
router.post("/profile", verifyToken, profileController);

// HOME || METHOD GET
router.get("/home", verifyToken, userDetailsController);

module.exports = router;
