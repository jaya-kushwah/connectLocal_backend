const multer = require("multer");
const EventCardModel = require("../Model/eventCardModel");
const Event = require("../Model/AdminEvent")
const UserModel = require("../Model/userModel");
const mongoose = require('mongoose');

const addCardEvent = async (req, res) => {
    const { userId, eventTitle, eventDate, eventTime, location } = req.body;

    const event = {
        userId,
        eventTitle,
        eventDate,
        eventTime,
        location,
        status: "pending",
        eventPic: req.file ? req.file.filename : ""
    };

    try {
        // 🔍 Check manually before save
        const duplicate = await EventCardModel.findOne({ userId, eventTitle, eventDate, eventTime, location });

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

const getCardsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        const CardData = await EventCardModel.find({ userId }); // Correct field
        res.status(200).send({ msg: "success", data: CardData });
    } catch (error) {
        res.status(500).send({ msg: "request failed", data: null, error: error.message });
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
        status: req.body.status,
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


const getApprovedCardsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ msg: "Invalid user ID" });
    }

    const approvedEvents = await EventCardModel.find({
      userId: new mongoose.Types.ObjectId(userId),
      status: "approved",
    });

    res.status(200).send({ msg: "Success", data: approvedEvents });
  } catch (error) {
    console.error("Error fetching approved events:", error);
    res.status(500).send({ msg: "Request failed", error: error.message });
  }
};






module.exports = {
    addCardEvent, getAllCardEvents, uploadFil,
    EventGetById, deleteCardEvent,
    updateCardEvent, getCardsByUserId,
    getApprovedCardsByUserId
};
