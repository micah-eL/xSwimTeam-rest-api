let {Event} = require("../../../models/main");


const getAllEvents = async (req, res) => {
    try {
        const allEvents = await Event.find();
        res.status(200).json({status: "success", data: allEvents});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const searchEvents = async (req, res) => {
    const {name, type, status, targetGroups, limit} = req.query;
    try {
        let queriedEvents = await Event.find();
        if (name) {
            queriedEvents = queriedEvents.filter((event) => {
                return event.name.includes(name);
            });
        }
        if (type) {
            queriedEvents = queriedEvents.filter((event) => {
                return event.type === type;
            });
        }
        if (status) {
            queriedEvents = queriedEvents.filter((event) => {
                return event.status === status;
            });
        }
        if (targetGroups) {
            queriedEvents = queriedEvents.filter((event) => {
                return event.targetGroups.includes(targetGroups);
            });
        }
        if (limit) {
            queriedEvents = queriedEvents.slice(0, Number(limit));
        }
        res.status(200).json({status: "success", data: queriedEvents});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const getEventWithID = async (req, res) => {
    const {eventID} = req.params;
    try {
        const queriedEvent = await Event.findById(eventID);
        res.status(200).json({status: "success", data: queriedEvent});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const addEvent = async (req, res) => {
    const newEvent = new Event(req.body);
    try {
        const addedEvent = await newEvent.save();
        res.status(201).json({status: "success", data: addedEvent});
    } catch(err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const updateEvent = async (req, res) => {
    const {eventID} = req.params;
    try {
        const queriedEvent = await Event.findById(eventID);
        if (req.body.name != null) {
            queriedEvent.name = req.body.name;
        }
        if (req.body.type != null) {
            queriedEvent.type = req.body.type;
        };
        if (req.body.startDate != null) {
            queriedEvent.startDate = req.body.startDate;
        };
        if (req.body.endDate != null) {
            queriedEvent.endDate = req.body.endDate;
        };
        if (req.body.location != null) {
            queriedEvent.location = req.body.location;
        };
        if (req.body.status != null) {
            queriedEvent.status = req.body.status;
        };
        if (req.body.declarationDeadline != null) {
            queriedEvent.declarationDeadline = req.body.declarationDeadline;
        };
        if (req.body.targetGroups != null) {
            queriedEvent.targetGroups = req.body.targetGroups;
        };
        if (req.body.moreDetails != null) {
            queriedEvent.moreDetails = req.body.moreDetails;
        };
        const updatedEvent = await queriedEvent.save();
        res.status(200).json({status: "success", data: updatedEvent});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const deleteEvent = async (req, res) => {
    const {eventID} = req.params;
    try {
        const deletedEvent = await Event.findByIdAndRemove(eventID);
        res.status(204).json({status: "success", data: deletedEvent});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};


module.exports = {
    getAllEvents,
    searchEvents,
    getEventWithID,
    addEvent,
    updateEvent,
    deleteEvent
};