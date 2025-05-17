const Event = require("../Model/AdminEvent");
const UserModel = require("../Model/userModel");
const EventCardModel = require("../Model/eventCardModel");
const mongoose = require('mongoose');

// ✅ Create new event with status "pending"
const createEvent = async (req, res) => {
    const event = {
        eventTitle: req.body.eventTitle,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
        location: req.body.location,
        status: "pending",
        eventPic: req.file ? req.file.filename : ""
    };

    try {
        const eventData = await new Event(event).save();
        res.status(201).send({ message: "Event submitted for approval", data: eventData });
    } catch (error) {
        res.status(400).send({ message: "Request failed", data: "", error: error.message });
    }
};

// ✅ Get all events (admin view: pending/approved/rejected)
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update event (admin only)
const updateEvent = async (req, res) => {
    try {
        const updateData = req.body;
        if (req.file) {
            updateData.eventPic = req.file.filename;
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete event
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  

const updateEventStatus = async (req, res) => {
    const eventId = req.params.id;
    const newStatus = req.body.status;

    console.log("Event ID sent to API:", eventId);
    console.log("New Status from form data:", newStatus);

    // Check for valid status
    if (!["approved", "rejected"].includes(newStatus)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        // Check for valid Object ID                
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: "Invalid Event ID" });
        }

        // Find and update the event
        const existing = await EventCardModel.findById(eventId);
        if (!existing) {
            return res.status(404).json({ message: "Event not found" });
        }

        const updatedEvent = await EventCardModel.findByIdAndUpdate(
            eventId,
            { status: newStatus },
            { new: true }
        );

        return res.status(200).json({
            message: `Event status updated to "${newStatus}"`,
            data: updatedEvent
        });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({ message: "Failed to update status", error: error.message });
    }
};


module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,            
    updateEventStatus
};
