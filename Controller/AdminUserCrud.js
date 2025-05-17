// const express = require("express");
// const User = require("../Model/AdminCrud");

// const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

// const getUsersByStatus = async (req, res) => {
//     try {
//         const { status } = req.params;
//         const users = await User.find({ status });
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

// const getUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

// const toggleBlockUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findById(id);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         user.status = user.status === "blocked" ? "active" : "blocked";
//         await user.save();
//         res.status(200).json({ message: `User ${user.status === "blocked" ? "blocked" : "unblocked"}` });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

// const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await User.findByIdAndDelete(id);
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };

// // const getDashboardStats = async (req, res) => {
// //     try {
// //         const totalUsers = await User.countDocuments({ isDeleted: false });
// //         const activeUsers = await User.countDocuments({ status: "active", isDeleted: false });
// //         const blockedUsers = await User.countDocuments({ status: "blocked", isDeleted: false });

// //         res.status(200).json({
// //             totalUsers,
// //             activeUsers,
// //             blockedUsers
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: "Server Error", error });
// //     }
// // };


// const getDashboardStats = async (req, res) => {
//     try {
//         const totalUsers = await User.countDocuments({ isDeleted: false });
//         const activeUsers = await User.countDocuments({ status: "active", isDeleted: false });
//         const blockedUsers = await User.countDocuments({ status: "blocked", isDeleted: false });

//         // Mock event data for now (replace with real aggregation later)
//         const eventsPerMonth = [
//             { month: "Jan", events: 4 },
//             { month: "Feb", events: 7 },
//             { month: "Mar", events: 5 },
//             { month: "Apr", events: 6 },
//             { month: "May", events: 3 },
//         ];

//         res.status(200).json({
//             totalUsers,
//             activeUsers,
//             blockedUsers,
//             eventsPerMonth // ✅ Add this to the response
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error });
//     }
// };


  

// module.exports = {
//     getAllUsers: [  getAllUsers],
//     getUsersByStatus: [  getUsersByStatus],
//     getUserById: [  getUserById],
//     updateUser: [  updateUser],
//     toggleBlockUser: [  toggleBlockUser],
//     deleteUser: [  deleteUser],
//     getDashboardStats: [  getDashboardStats]
// };


const express = require("express");
const User = require("../Model/AdminCrud");
const EventCardModel = require("../Model/eventCardModel"); // Assuming you have an Event model

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const getUsersByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const users = await User.find({ status });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// New controller to get events by user ID
const getEventsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Find all events where the creator field matches the userId
        const events = await EventCardModel.find({ creator: userId });
        
        if (!events || events.length === 0) {
            return res.status(404).json({ message: "No events found for this user" });
        }
        
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const toggleBlockUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.status = user.status === "blocked" ? "active" : "blocked";
        await user.save();
        res.status(200).json({ message: `User ${user.status === "blocked" ? "blocked" : "unblocked"}` });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ isDeleted: false });
        const activeUsers = await User.countDocuments({ status: "active", isDeleted: false });
        const blockedUsers = await User.countDocuments({ status: "blocked", isDeleted: false });

        // Mock event data for now (replace with real aggregation later)
        const eventsPerMonth = [
            { month: "Jan", events: 4 },
            { month: "Feb", events: 7 },
            { month: "Mar", events: 5 },
            { month: "Apr", events: 6 },
            { month: "May", events: 3 },
        ];

        res.status(200).json({
            totalUsers,
            activeUsers,
            blockedUsers,
            eventsPerMonth
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports = {
    getAllUsers,
    getUsersByStatus,
    getUserById,
    getEventsByUserId, // Export the new function
    updateUser,
    toggleBlockUser,
    deleteUser,
    getDashboardStats
};

