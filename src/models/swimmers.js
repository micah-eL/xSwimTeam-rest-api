const mongoose = require("mongoose");


const swimmerSchema = new mongoose.Schema({
    name: {
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


module.exports = mongoose.model("Swimmer", swimmerSchema);