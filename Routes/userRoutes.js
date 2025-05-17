const express = require("express");

const {
  addUser,
  getUser,
  updateUserName,
  login,
  forgotPassword,
  resetPassword,
  verifyOtp,
  addIntersts,
  verifySignupOtp,
  getUserById
} = require("../Controller/userController");
const{upload1}=require("../Middleware/userMiddleware");

const router = express.Router();
router.route("/add").post(addUser);
router.route("/get").get(getUser);
router.route("/:id").get(getUserById);
// router.route("/update/:id").patch(updateUserName);
router.route("/update/:id").patch(upload1.single("profileImage"),updateUserName);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyotp/:email").post(verifyOtp);
router.route("/resetpassword/:email").patch(resetPassword);
router.route("/addinterest/:id").patch(addIntersts);
router.route("/verifySignupOtp/:email").post(verifySignupOtp);

module.exports = router;
