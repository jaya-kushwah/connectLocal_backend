const express = require("express");
const router = express.Router();
// const upload = require("../Middleware/upload");
const{upload1}=require("../Middleware/userMiddleware");
const eventController = require("../Controller/AdminEventContro");  // ✅ Ensure this is correct

// Create Event Route (with image upload)
router.post("/create", upload1.single("eventImage"), eventController.createEvent);

// Get All Events
router.get("/", eventController.getEvents);

// Get Event by ID
router.get("/:id" ,eventController.getEventById);

// Update Event (with image upload)
router.put("/:id", upload1.single("eventImage"), eventController.updateEvent);

// Delete Event
router.delete("/:id", eventController.deleteEvent);

module.exports = router;


