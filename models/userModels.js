const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
        unique: true,
    }
}, {
    timestamps: true,  
});

module.exports = mongoose.model("User", UserSchema);
