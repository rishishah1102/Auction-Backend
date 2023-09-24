const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel")

const loginOtpController = async (req, res) => {
    const { email } = req.body;
    try {

        // check user
        const user = await userModel.findOne({ email });

        // generate token for authentication
        const token = jwt.sign({ user }, process.env.TOKEN_KEY);

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while sending",
            error
        });
    }
}

module.exports = loginOtpController;