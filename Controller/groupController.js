const Group = require("../Model/groupModel"); 
const UserModel = require("../Model/userModel");

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



  const getMyGroups = async (req, res) => {
    try {
      const userId = req.cookies.userId;
  
      if (!userId) {
        return res.status(401).json({ success: false, message: 'User not logged in' });
      }
  
      const groups = await Group.find({ userId });
  
      res.status(200).json({
        success: true,
        count: groups.length,
        data: groups
      });
    } catch (error) {
      console.error("Error fetching user groups:", error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  
  

module.exports = { addGroup,confirmUserInGroup,getAllGroups,validateGroupMembers ,getMyGroups};
