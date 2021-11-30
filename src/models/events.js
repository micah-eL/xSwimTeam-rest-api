const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    declarationDeadline: {
        type: Date,
        required: true
    },
    targetGroups: {
        type: String,
        required: true
    },
    moreDetails: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("Event", eventSchema);