const userModel = require("../../models/userModel.js");
const sendEmail = require("../../utils/sendEmail.js");

const loginController = async (req, res) => {
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

        // check user
        const user = await userModel.findOne({ email });

        // if user doesn't exist
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found. Please register first",
            });
        }
        else{
            await sendEmail({
                email: email,
                subject: `About Login`,
                message,
            });
            res.status(201).send({
                success: true,
                message: `Otp is send to ${email}`,
                otp
            });
        }
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