const express = require('express')

const {
  addEvent,
  getAllEvents,
  uploadFile,
  getEventById,
  filterEvents,
  deleteEvent,
  updateEvent
} = require('../Controller/eventController');

const router = express.Router();
const { upload1 } = require("../Middleware/userMiddleware");





router.route("/addEvent").post(upload1.single('eventImage'), addEvent);
router.route("/upload").post(upload1.single('eventImage'), uploadFile)
router.route("/getAllEvents").get(getAllEvents);
router.route("/:id").get(getEventById);
router.route("/filter/:type").get(filterEvents);
router.route("/delete/:id").delete(deleteEvent);
router.route("/update/:id").put(upload1.single("eventPic"), updateEvent);





module.exports = router;