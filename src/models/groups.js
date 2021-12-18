const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    groupInfo: {
        type: String,
        required: true
    },
    practices: {
        totalPractices: {
            required: true,
            type: Number
        },
        totalHours: {
            required: true,
            type: Number
        },
        schedule: {
            monday: {
                required: true,
                type: String
            },
            tuesday: {
                required: true,
                type: String
            },
            wednesday: {
                required: true,
                type: String
            },
            thursday: {
                required: true,
                type: String,
            },
            friday: {
                required: true,
                type: String
            },
            saturday: {
                required: true,
                type: String
            },
            sunday: {
                required: true,
                type: String
            }
        }
    }
});


module.exports = mongoose.model("Group", groupSchema);