const multer = require("multer");
const EventTrendModel = require("../Model/eventTrendSchema");

const addTrendEvent = async (req, res) => {
    const event = {
        eventName: req.body.eventName,
        eventStartDate: req.body.eventStartDate,
        eventEndDate: req.body.eventEndDate,
        location: req.body.location,
        slots: req.body.slots,
        slotPrice: req.body.slotPrice,
        eventPic: req.file ? req.file.filename : ""
    };

    if (event.eventPic === undefined) {
        event.eventPic = "";
    } else {
        event.eventPic =  req.file.filename;
    }

    try {
        const eventData = await new EventTrendModel(event).save();
        res.status(201).send({ message: "Success!", data: eventData });
    } catch (error) {
        res.status(400).send({ message: "Request failed", data: "", error: error.message });
    }
};

const getAllTrendEvents = async (req, res) => {
    try {
        const events = await EventTrendModel.find();
        res.status(200).json({ message: "Success!", data: events });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch events", error: error.message });
    }
};

const uploadFiles = async (req, res) => {
    if (req.file.size < (1024 * 50)) {
        res.status(200).send({ message: "Success", data: "http://localhost:8080/uploads/" + req.file.originalname })
    } else {
        fs.unlinkSync("./uploads" + req.file.filename)
        res.status(404).send({ message: "Failed...", data: "", error: "img size is larger" })
    }
}


module.exports = { addTrendEvent,getAllTrendEvents,uploadFiles };
