const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    searchUsers,
    getUserWithID,
    addUser,
    loginUser,
    updateUser,
    deleteUser
} = require("../../../controllers/v1/users/users");


router.get("/", getAllUsers);
router.get("/search", searchUsers); // ex. .../search?group=HP&limit=2
router.get("/:userID", getUserWithID);

router.post("/register", addUser);
router.post("/login", loginUser);

router.patch("/:userID", updateUser);

router.delete("/:userID", deleteUser);


module.exports = router;