const express = require('express')

const {
  addGroup,
  confirmUserInGroup,
  getAllGroups,
  validateGroupMembers,
  getGroupsByUserId,
  approveGroupStatus,
  getSuggestedEmails ,
  editGroup,
  deleteGroup
} = require('../Controller/groupController');


const router = express.Router();

router.route("/").post(addGroup);
router.put("/confirm-user", confirmUserInGroup);
router.get("/", getAllGroups);
router.post('/validate-emails', validateGroupMembers);
router.get("/user/:userId", getGroupsByUserId);
router.patch("/status/:id", approveGroupStatus);
router.get("/suggest-emails", getSuggestedEmails);
router.patch("/edit/:id", editGroup);
router.delete("/delete/:id", deleteGroup);




module.exports = router;