const express = require("express");
const router = express.Router();
const{upload1}=require("../Middleware/userMiddleware");
const eventController = require("../Controller/AdminEventContro");  // ✅ Ensure this is correct


router.post("/create", upload1.single("eventImage"), eventController.createEvent);
router.get("/", eventController.getEvents);
router.get("/:id" ,eventController.getEventById);
router.put("/:id", upload1.single("eventImage"), eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.patch("/event/status/:id", eventController.updateEventStatus);

module.exports = router;


