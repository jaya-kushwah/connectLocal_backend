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
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      }
}, {
    timestamps: true
});


const Event = mongoose.models.events || mongoose.model('events', eventSchema);

module.exports = Event;
