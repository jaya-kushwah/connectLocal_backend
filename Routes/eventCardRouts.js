const express = require ('express')

const {
  addCardEvent,
  getAllCardEvents,
  uploadFil,
  EventGetById,
  deleteCardEvent,
  updateCardEvent
 }=require('../Controller/eventCardController');

const router = express.Router();
const{upload1}=require("../Middleware/userMiddleware");





router.route("/addCardEvent").post( upload1.single('eventPic'),addCardEvent);
router.route("/upload").post(upload1.single('eventPic'), uploadFil)
router.route("/getAllCardEvents").get(getAllCardEvents);
router.route("/:id").get(EventGetById);
router.route("/delete/:id").delete(deleteCardEvent);
router.route("/update/:id").put(upload1.single("eventPic"), updateCardEvent);



module.exports= router;