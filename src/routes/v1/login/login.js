const express = require("express");
const router = express.Router();

const {loginUser} = require("../../../controllers/v1/users/users");


router.post("/", loginUser);


module.exports = router;