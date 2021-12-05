const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("User", userSchema);