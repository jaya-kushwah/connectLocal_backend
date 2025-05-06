const express = require("express");
const { getAllUsers,getDashboardStats, getUsersByStatus, getUserById, updateUser, toggleBlockUser, deleteUser } = require("../Controller/AdminUserCrud");

const router = express.Router();

router.get("/",   getAllUsers);
router.get("/status/:status",   getUsersByStatus);
router.get("/users/stats", getDashboardStats); 
router.get("stats", getDashboardStats);
router.get("/:id",   getUserById);
router.put("/:id",   updateUser);
router.patch("/:id/block",   toggleBlockUser);
router.delete("/:id",   deleteUser);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const {
//     getAllUsers,
//     getUsersByStatus,
//     getUserById,
//     updateUser,
//     toggleBlockUser,
//     deleteUser,
//     getDashboardStats, // ADD this one
// } = require("../Controller/AdminUserCrud");

// // ✅ Add this route FIRST
// router.get("/users/stats", getDashboardStats);  // Your dashboard stats API

// // Then the dynamic route BELOW it
// router.get("/users/:id", getUserById);

// // Keep other routes
// router.get("/users", getAllUsers);
// router.get("/users/status/:status", getUsersByStatus);
// router.put("/users/:id", updateUser);
// router.patch("/users/block/:id", toggleBlockUser);
// router.delete("/users/:id", deleteUser);

// module.exports = router;
