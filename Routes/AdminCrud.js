const express = require("express");
const { getAllUsers,getDashboardStats, getUsersByStatus, getUserById, updateUser, toggleBlockUser, deleteUser,getEventsByUserId } = require("../Controller/AdminUserCrud");

const router = express.Router();

router.get("/",   getAllUsers);
router.get("/status/:status",   getUsersByStatus);
router.get("/users/stats", getDashboardStats); 
router.get("stats", getDashboardStats);
router.get("/:id",   getUserById);
router.put("/:id",   updateUser);
router.patch("/:id/block",   toggleBlockUser);
router.delete("/:id",   deleteUser);
router.get("/:userId", getEventsByUserId);

module.exports = router;

