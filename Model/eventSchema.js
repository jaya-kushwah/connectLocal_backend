const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true,
    },
    description: {
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
    ticketPrice: {
        type: Number,
        required: true,
    },
    isExpired: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "pending",
    },
    eventType: {
        type: String,
        enum: ['All', 'Today', 'Tomorrow', 'ThisWeekend', 'Free'],
        default: 'All',
    },
    eventImage: {
        type: String,
        default: null,
    },
}, {
    timestamps: true
});

const EventModel = mongoose.model('Event', eventSchema);
module.exports = EventModel;
