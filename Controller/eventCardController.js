const multer = require("multer");
const EventCardModel = require("../Model/eventCardModel");

const addCardEvent = async (req, res) => {
    const { eventTitle, eventDate, eventTime, location } = req.body;

    const event = {
        eventTitle,
        eventDate,
        eventTime,
        location,
        status: "pending",
        eventPic: req.file ? req.file.filename : ""
    };

    try {
        // 🔍 Check manually before save
        const duplicate = await EventCardModel.findOne({ eventTitle, eventDate, eventTime, location });

        if (duplicate) {
            return res.status(409).send({
                message: "Duplicate event already exists.",
                data: duplicate
            });
        }

        // ✅ Save new unique event
        const savedEvent = await new EventCardModel(event).save();
        res.status(201).send({ message: "Success!", data: savedEvent });

    } catch (error) {
        res.status(400).send({
            message: "Request failed",
            error: error.message
        });
    }
};


const getAllCardEvents = async (req, res) => {
    try {
        const events = await EventCardModel.find();
        res.status(200).json({ message: "Success!", data: events });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch events", error: error.message });
    }
};

const uploadFil = async (req, res) => {
    if (req.file.size < (1024 * 50)) {
        res.status(200).send({ message: "Success", data: "http://localhost:8080/uploade/" + req.file.originalname })
    } else {
        fs.unlinkSync("./uploads" + req.file.filename)
        res.status(404).send({ message: "Failed...", data: "", error: "img size is larger" })
    }
}



const EventGetById = async (req, res) => {
    const eventId = req.params.id;

    try {
        const event = await EventCardModel.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Success!", data: event });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch event", error: error.message });
    }
};


const deleteCardEvent = async (req, res) => {
    try {
        const deletedEvent = await EventCardModel.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateCardEvent = async (req, res) => {
    const eventId = req.params.id;

    const updatedEvent = {
        eventTitle: req.body.eventTitle,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
        location: req.body.location,
    };

    if (req.file) {
        updatedEvent.eventPic = req.file.filename;
    }

    try {
        const event = await EventCardModel.findByIdAndUpdate(eventId, updatedEvent, {
            new: true,
            runValidators: true,
        });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", data: event });
    } catch (error) {
        res.status(500).json({ message: "Failed to update event", error: error.message });
    }
};



module.exports = { addCardEvent, getAllCardEvents, uploadFil, EventGetById, deleteCardEvent, updateCardEvent };
