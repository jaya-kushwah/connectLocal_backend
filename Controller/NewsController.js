const News = require("../Model/NewsModel");

// 🟢 Add News
const addNews = async (req, res) => {
    try {
        const { title, content, createdBy } = req.body;

        if (!title || !content || !createdBy) {
            return res.status(400).send({ message: "Please fill all fields" });
        }

        const news = new News({ title, content, createdBy });
        await news.save();

        res.status(201).send({ success: true, news });
    } catch (error) {
        res.status(500).send({ message: "Failed to add news", error });
    }
};

// 🟢 Get All Active News
const getAllNews = async (req, res) => {
    try {
        const newsList = await News.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).send({ success: true, newsList });
    } catch (error) {
        res.status(500).send({ message: "Error fetching news", error });
    }
};

// 🟢 Get News by ID
const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news || !news.isActive) {
            return res.status(404).send({ message: "News not found" });
        }
        res.status(200).send({ success: true, news });
    } catch (error) {
        res.status(500).send({ message: "Error fetching news", error });
    }
};

// 🟢 Soft Delete News
const deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).send({ message: "News not found" });

        news.isActive = false;
        await news.save();

        res.send({ success: true, message: "News deleted (soft)" });
    } catch (error) {
        res.status(500).send({ message: "Delete failed", error });
    }
};

module.exports = {
    addNews,
    getAllNews,
    getNewsById,
    deleteNews,
};