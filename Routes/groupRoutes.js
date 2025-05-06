const express = require('express')

const {
  addGroup,
  confirmUserInGroup,
  getAllGroups,
  validateGroupMembers,
  getMyGroups
} = require('../Controller/groupController');


const router = express.Router();

router.route("/").post(addGroup);
router.put("/confirm-user", confirmUserInGroup);
router.get("/", getAllGroups);
router.post('/validate-emails', validateGroupMembers);
router.get('/mygroups', getMyGroups);



module.exports = router;