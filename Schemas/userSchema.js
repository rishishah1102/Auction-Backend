const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        profile: {
            ImgUrl: {
                type: String,
                required: true,
                default:"your image"
            },
            teamname: {
                type: String,
                required: true,
                default:"your team"
            }
        }
    }
);

module.exports = userSchema;
