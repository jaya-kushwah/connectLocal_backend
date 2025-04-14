const express = require ('express')

const {
  addCardEvent,
  getAllCardEvents,
  uploadFil,
  EventGetById,
 }=require('../Controller/eventCardController');

const router = express.Router();
const{upload1}=require("../Middleware/userMiddleware");





router.route("/addCardEvent").post( upload1.single('eventPic'),addCardEvent);
router.route("/upload").post(upload1.single('eventPic'), uploadFil)
router.route("/getAllCardEvents").get(getAllCardEvents);
router.route("/:id").get(EventGetById);



module.exports= router;