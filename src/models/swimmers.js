const mongoose = require("mongoose");


const swimmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    group: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Swimmer", swimmerSchema);