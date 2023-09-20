const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
    try {
        const { email } = req.body;

        // check user
        const user = await userModel.findOne({ email });

        // if user doesn't exist
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found. Please register first",
            });
        }

        // generate token for authentication
        const token = jwt.sign({ user }, process.env.TOKEN_KEY);

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    }

    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
}

module.exports = loginController;