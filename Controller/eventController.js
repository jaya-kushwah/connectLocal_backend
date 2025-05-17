const multer = require("multer");
const EventModel = require("../Model/eventSchema");

const addEvent = async (req, res) => {
    try {
        const event = {
            eventTitle: req.body.eventTitle,
            description: req.body.description,
            eventStartDate: req.body.eventStartDate,
            eventEndDate: req.body.eventEndDate,
            location: req.body.location,
            slots: req.body.slots,
            ticketPrice: req.body.ticketPrice,
            eventType: req.body.eventType,
            eventImage: req.file ? req.file.filename : "" // Handle both cases in one line
        };

        const eventData = await new EventModel(event).save();
        res.status(201).send({ message: "Success!", data: eventData });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(400).send({ 
            message: "Request failed", 
            error: error.message 
        });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json({ message: "Success!", data: events });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch events", error: error.message });
    }
};

const uploadFile = async (req, res) => {
    if (req.file.size < (1024 * 50)) {
        res.status(200).send({ message: "Success", data: "http://localhost:8080/upload/" + req.file.originalname })
    } else {
        fs.unlinkSync("./uploads" + req.file.filename)
        res.status(404).send({ message: "Failed...", data: "", error: "img size is larger" })
    }
}


const getEventById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await EventModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Success!", data: event });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch event", error: error.message });
    }
};

const filterEvents = async (req, res) => {
    const type = req.params.type;
    const today = new Date();
    let filter = {};

    if (type === "Today") {
        const start = new Date(today.setHours(0, 0, 0, 0));
        const end = new Date(today.setHours(23, 59, 59, 999));
        filter.eventStartDate = { $gte: start, $lte: end };

    } else if (type === "Tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const start = new Date(tomorrow.setHours(0, 0, 0, 0));
        const end = new Date(tomorrow.setHours(23, 59, 59, 999));
        filter.eventStartDate = { $gte: start, $lte: end };

    } else if (type === "ThisWeekend") {
        const saturday = new Date();
        const sunday = new Date();
        saturday.setDate(today.getDate() + (6 - today.getDay()));
        sunday.setDate(saturday.getDate() + 1);
        const start = new Date(saturday.setHours(0, 0, 0, 0));
        const end = new Date(sunday.setHours(23, 59, 59, 999));
        filter.eventStartDate = { $gte: start, $lte: end };

    } else if (type === "Free") {
        filter.slotPrice = 0;

    } else {
        filter = {}; // All events
    }

    try {
        const events = await EventModel.find(filter);
        res.status(200).json({ message: `Filtered by ${type}`, data: events });
    } catch (error) {
        res.status(500).json({ message: "Error filtering events", error: error.message });
    }
};


const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Optionally delete image file
        if (deletedEvent.eventImage) {
            const filePath = `./uploads/${deletedEvent.eventImage}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.status(200).json({ message: "Event deleted successfully", data: deletedEvent });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete event", error: error.message });
    }
};


// ✅ UPDATE Event
const updateEvent = async (req, res) => {
    const eventId = req.params.id;

    const updateData = {
        eventTitle: req.body.eventTitle,
        description: req.body.description,
        eventStartDate: req.body.eventStartDate,
        eventEndDate: req.body.eventEndDate,
        location: req.body.location,
        slots: req.body.slots,
        ticketPrice: req.body.ticketPrice,
        eventType: req.body.eventType,
    };

    if (req.file) {
        updateData.eventImage = req.file.filename;
    }

    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", data: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: "Failed to update event", error: error.message });
    }
};


module.exports = {
    addEvent,
    getAllEvents,
    uploadFile,
    getEventById,
    filterEvents,
    deleteEvent,
    updateEvent
};

