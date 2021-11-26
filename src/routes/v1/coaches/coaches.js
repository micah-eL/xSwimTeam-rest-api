const express = require("express");
const router = express.Router();

const {
    getAllCoaches,
    searchCoaches,
    getCoachWithID,
    addCoach,
    updateCoach,
    deleteCoach
} = require("../../../controllers/v1/coaches/coaches");


router.get("/", getAllCoaches);
router.get("/search", searchCoaches); // ex. .../search?group=HP&limit=2
router.get("/:coachID", getCoachWithID);

router.post("/", addCoach);

router.patch("/:coachID", updateCoach);

router.delete("/:coachID", deleteCoach);


module.exports = router;