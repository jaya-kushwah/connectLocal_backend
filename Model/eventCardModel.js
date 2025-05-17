const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
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
    status: {
        type: String,
        // enum: ['pending', 'confirm'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const EventCardModel = mongoose.model('Cards', eventSchema);
module.exports = EventCardModel;
