const Group = require("../Model/groupModel");
const UserModel = require("../Model/userModel");
const mongoose = require('mongoose');

const addGroup = async (req, res) => {
  const { userId, name, description, status, groupMember } = req.body;

  try {
    let newGroup = new Group({ userId, name, description, status, groupMember });
    newGroup = await newGroup.save();

    res.status(201).json({ message: "Success!", data: newGroup });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Failed!", error: error.message });
  }
};

const getAllGroups = async (req, res) => {
  try {
    let getgroup = await Group.find({});
    console.log("hello");
    res.status(200).send({ message: "Success!", data: getgroup });
  } catch (error) {
    res.status(400).send({ message: "Failed!", data: "", error: error.message });
  }
};


const confirmUserInGroup = async (req, res) => {
  const { groupId, userId } = req.body;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.groupMember.includes(userId)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    group.groupMember.push(userId);
    await group.save();

    res.status(200).json({ message: "User confirmed in group", data: group });
  } catch (error) {
    res.status(500).json({ message: "Error confirming user in group", error: error.message });
  }
};



const validateGroupMembers = async (req, res) => {
  const { emails } = req.body;

  if (!emails || !Array.isArray(emails)) {
    return res.status(400).json({ message: "Invalid request. 'emails' must be an array." });
  }

  try {
    const existingUsers = await UserModel.find({ email: { $in: emails } }, { email: 1, _id: 1, name: 1 });

    const existingEmails = existingUsers.map(user => user.email);
    const nonExistingEmails = emails.filter(email => !existingEmails.includes(email));

    res.status(200).json({
      message: "Validation result",
      existingUsers,
      nonExistingEmails
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getGroupsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const groupData = await Group.find({ userId }); // Correct field
    res.status(200).send({ msg: "success", data: groupData });
  } catch (error) {
    res.status(500).send({ msg: "request failed", data: null, error: error.message });
  }
};


const approveGroupStatus = async (req, res) => {
  const groupId = req.params.id;
  const newStatus = req.body.status;

  console.log("Event ID sent to API:", groupId);
  console.log("New Status from form data:", newStatus);

  // Check for valid status
  if (!["approved", "rejected"].includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    // Check for valid Object ID                
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid Group ID" });
    }

    // Find and update the event
    const existing = await Group.findById(groupId);
    if (!existing) {
      return res.status(404).json({ message: "Group not found" });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { status: newStatus },
      { new: true }
    );

    return res.status(200).json({
      message: `Group status updated to "${newStatus}"`,
      data: updatedGroup
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

const getSuggestedEmails = async (req, res) => {
  try {
    const { query } = req.query; // Optional query param for filtering

    // Match users where email starts with the given query (case-insensitive)
    const emailFilter = query
      ? { email: { $regex: `^${query}`, $options: 'i' } }
      : {};

    const users = await UserModel.find(emailFilter, { email: 1, _id: 0 });

    const emails = users.map(user => user.email);

    res.status(200).json({
      message: "User emails fetched successfully",
      data: emails
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching emails", error: error.message });
  }
};


const editGroup = async (req, res) => {
  const groupId = req.params.id;
  const { name, description, status, groupMember } = req.body;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ message: "Invalid Group ID" });
  }

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name, description, status, groupMember },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group updated successfully", data: updatedGroup });
  } catch (error) {
    res.status(500).json({ message: "Failed to update group", error: error.message });
  }
};


const deleteGroup = async (req, res) => {
  const groupId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return res.status(400).json({ message: "Invalid Group ID" });
  }

  try {
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully", data: deletedGroup });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete group", error: error.message });
  }
};





module.exports = {
  addGroup, confirmUserInGroup, getAllGroups,
  validateGroupMembers, getGroupsByUserId,
  approveGroupStatus, getSuggestedEmails,
  editGroup, deleteGroup
};
