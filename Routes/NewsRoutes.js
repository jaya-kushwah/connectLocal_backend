const express = require("express");
const router = express.Router();
const {
    addNews,
    getAllNews,
    getNewsById,
    deleteNews
} = require("../Controller/NewsController");

const { userTokenVerification } = require("../Middleware/userMiddleware"); // Your existing file

// 🔹 Public Routes
router.get("/all", getAllNews);
router.get("/:id", getNewsById);

// 🔹 Protected Routes (using your own token check logic)
router.post("/add", userTokenVerification, addNews);
router.delete("/delete/:id", userTokenVerification, deleteNews);

module.exports = router;