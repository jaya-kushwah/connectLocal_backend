const multer = require("multer");
const EventCardModel = require("../Model/eventCardModel");

const addCardEvent = async (req, res) => {
    const event = {
        eventTitle: req.body.eventTitle,
        eventDate: req.body.eventDate,
        eventTime: req.body.eventTime,
        location: req.body.location,
        eventPic: req.file ? req.file.filename : ""
    };

    if (event.eventPic === undefined) {
        event.eventPic = "";
    } else {
        event.eventPic = req.file.filename;
    }

    try {
        const eventData = await new EventCardModel(event).save();
        res.status(201).send({ message: "Success!", data: eventData });
    } catch (error) {
        res.status(400).send({ message: "Request failed", data: "", error: error.message });
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


module.exports = { addCardEvent, getAllCardEvents, uploadFil, EventGetById };
