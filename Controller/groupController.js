const Group = require("../Model/groupModel"); // Use uppercase 'G' for models by convention

const addGroup = async (req, res) => {
  const { userId, name, description, status, groupMember } = req.body;

  try {
    // Create a new group instance
    let newGroup = new Group({ userId, name, description, status, groupMember });

    // Save to database
    newGroup = await newGroup.save();

    res.status(201).json({ message: "Success!", data: newGroup });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Failed!", error: error.message });
  }
};

// const addGroup = async (req, res) => {
//   const { name, description, status, groupMember } = req.body;

//   try {
//     // Ensure the user is authenticated via middleware
//     if (!req.userData || !req.userData.userid) {
//       return res.status(401).json({ message: 'User is not authenticated' });
//     }

//     // Validate required fields
//     if (!name || !description) {
//       return res.status(400).json({ message: 'Name and description are required' });
//     }

//     // Validate group members
//     if (!groupMember || groupMember.length === 0) {
//       return res.status(400).json({ message: 'At least one group member is required' });
//     }

//     // Validate member emails
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const invalidEmails = groupMember.filter(member => !emailRegex.test(member.email));

//     if (invalidEmails.length > 0) {
//       return res.status(400).json({
//         message: 'Invalid email addresses',
//         invalidEmails: invalidEmails.map(m => m.email)
//       });
//     }

//     // Check for duplicate members
//     const memberEmails = groupMember.map(m => m.email);
//     if (new Set(memberEmails).size !== memberEmails.length) {
//       return res.status(400).json({ message: 'Duplicate member emails found' });
//     }

//     // Create the new group
//     const newGroup = new Group({
//       admin: req.userData.userid,
//       name,
//       description,
//       status: status || 'active',
//       groupMember: groupMember.map(member => ({
//         email: member.email,
//         role: 'member',
//         status: 'pending'
//       }))
//     });

//     // Save to database
//     await newGroup.save();

//     // Populate admin details in the response
//     const populatedGroup = await Group.findById(newGroup._id)
//       .populate('admin', 'name email avatar')
//       .exec();

//     res.status(201).json({
//       message: 'Group created successfully!',
//       data: populatedGroup,
//       memberInvites: groupMember.length
//     });

//   } catch (error) {
//     console.error('Error creating group:', error);

//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(val => val.message);
//       return res.status(400).json({ message: 'Validation failed', errors: messages });
//     }

//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'Group name already exists' });
//     }

//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


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
  

  

module.exports = { addGroup,confirmUserInGroup,getAllGroups };
