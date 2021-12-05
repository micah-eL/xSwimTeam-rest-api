const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    searchUsers,
    getUserWithID,
    addUser,
    updateUser,
    deleteUser
} = require("../../../controllers/v1/users/users");


router.get("/", getAllUsers);
router.get("/search", searchUsers); // ex. .../search?group=HP&limit=2
router.get("/:coachID", getUserWithID);

router.post("/", addUser);

router.patch("/:coachID", updateUser);

router.delete("/:coachID", deleteUser);


module.exports = router;