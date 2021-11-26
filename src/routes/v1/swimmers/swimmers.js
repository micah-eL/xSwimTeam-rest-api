const express = require("express");
const router = express.Router();

const {
    getAllSwimmers,
    searchSwimmers,
    getSwimmerWithID,
    addSwimmer,
    updateSwimmer,
    deleteSwimmer
} = require("../../../controllers/v1/swimmers/swimmers");


router.get("/", getAllSwimmers);
router.get("/search", searchSwimmers); // ex. .../search?group=HP&limit=2
router.get("/:swimmerID", getSwimmerWithID);

router.post("/", addSwimmer);

router.patch("/:swimmerID", updateSwimmer);

router.delete("/:swimmerID", deleteSwimmer);


module.exports = router;