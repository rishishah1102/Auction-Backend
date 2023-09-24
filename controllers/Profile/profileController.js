const userModel = require("../../models/userModel.js");

const profileController = async (req, res) => {
    try {
        const {email} = req.user.user;
        const { ImgUrl, teamname } = req.body;

        const existingUser = await userModel.findOne({ email: email });
        existingUser.ImgUrl = ImgUrl || existingUser.profile.ImgUrl;
        existingUser.teamname = teamname || existingUser.profile.teamname;
        const saveprofile = await existingUser.save();

        res.status(201).send({
            success: true,
            message: "Profile updated successfully",
            saveprofile
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in creating or updating profile",
            error,
        });
    }
};

module.exports = profileController;