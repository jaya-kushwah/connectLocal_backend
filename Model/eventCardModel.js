const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true,
    },
    eventDate: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
    },
    eventPic: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});

const EventCardModel = mongoose.model('Cards', eventSchema);
module.exports = EventCardModel;
