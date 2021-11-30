const express = require("express");
const router = express.Router();

const {
    getAllEvents,
    searchEvents,
    getEventWithID,
    addEvent,
    updateEvent,
    deleteEvent
} = require("../../../controllers/v1/events/events");


router.get("/", getAllEvents);
router.get("/search", searchEvents); 
router.get("/:eventID", getEventWithID);

router.post("/", addEvent);

router.patch("/:eventID", updateEvent);

router.delete("/:eventID", deleteEvent);


module.exports = router;