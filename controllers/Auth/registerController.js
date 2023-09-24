const userModel = require("../../models/userModel.js");
const sendEmail = require("../../utils/sendEmail.js");

const registerController = async (req, res) => {
    try {
        function getRandomNumber(min, max) {
            // Generate a random decimal number between 0 and 1
            const randomDecimal = Math.random();

            // Scale the random decimal to the desired range
            // and round it to an integer
            const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;

            return randomNumber;
        }

        // Usage example: Generate a random number between 1 and 10
        const minRange = 100000;
        const maxRange = 999999;
        const otp = getRandomNumber(minRange, maxRange);

        const message = `Your otp is :- ${otp}, Thank you`;

        const { email } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            res.status(409).send({
                success: false,
                message: "Already Registered. Please login.",
            });
        }
        else {
            await sendEmail({
                email: email,
                subject: `About Registration`,
                message,
            });
            res.status(201).send({
                success: true,
                message: `Otp is send to ${email}`,
                otp
            });
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

module.exports = registerController;