const express = require("express");
const router = express.Router();

const {
    getAllGroups,
    searchGroups,
    addGroup,
    updateGroup,
    deleteGroup
} = require("../../../controllers/v1/groups/groups");


router.get("/", getAllGroups);
router.get("/search", searchGroups); // ex. .../search?group=HP&limit=2

router.post("/", addGroup);

router.patch("/:groupID", updateGroup);

router.delete("/:groupID", deleteGroup);


module.exports = router;