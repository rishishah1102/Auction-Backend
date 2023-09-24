const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel.js");

const userOtpController = async (req, res) => {
    const { email, username } = req.body;
    try {
        // Save the user in the database
        const user = await userModel.create({
            username,
            email
        });
        
        // generate token for authentication
        const token = jwt.sign({ user }, process.env.TOKEN_KEY);

        if (user) {
            res.status(201).send({
                success: true,
                message: "User Registered Successfully",
                token,
                user,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while sending",
            error
        });
    }
}

module.exports = userOtpController;