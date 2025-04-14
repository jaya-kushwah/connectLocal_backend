const express = require ('express')

const {
  addTrendEvent,
  getAllTrendEvents,
  uploadFiles,
 }=require('../Controller/eventTrendController');

const router = express.Router();
const{upload1}=require("../Middleware/userMiddleware");





router.route("/addTrendEvent").post( upload1.single('eventPic'),addTrendEvent);
router.route("/uploads").post(upload1.single('eventPic'), uploadFiles)
router.route("/getAllTrendEvents").get(getAllTrendEvents);






module.exports= router;