const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventStartDate: {
        type: Date,
        required: true,
    },
    eventEndDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    slots: {
        type: Number,
        required: true,
    },
    slotPrice: {
        type: Number,
        required: true,
    },
    isExpired: {
        type: Boolean,
        default: false,
    },
    status:{
            type:String,
            default:"pending",
    },
    eventPic: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});

const EventTrendModel = mongoose.model('trend', eventSchema);
module.exports = EventTrendModel;
