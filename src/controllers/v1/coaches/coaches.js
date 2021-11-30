let {Coach} = require("../../../models/main");


const getAllCoaches = async (req, res) => {
    try {
        const allCoaches = await Coach.find();
        res.status(200).json({status: "success", data: allCoaches});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const searchCoaches = async (req, res) => {
    const {group, limit} = req.query;
    try {
        let queriedCoaches = await Coach.find();
        if (group) {
            queriedCoaches = queriedCoaches.filter((user) => {
                return user.group === group;
            });
        }
        if (limit) {
            queriedCoaches = queriedCoaches.slice(0, Number(limit));
        }
        res.status(200).json({status: "success", data: queriedCoaches});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const getCoachWithID = async (req, res) => {
    const {coachID} = req.params;
    try {
        const queriedCoach = await Coach.findById(coachID);
        res.status(200).json({status: "success", data: queriedCoach});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const addCoach = async (req, res) => {
    const newCoach = new Coach(req.body);
    try {
        const addedCoach = await newCoach.save();
        res.status(201).json({status: "success", data: addedCoach});
    } catch(err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const updateCoach = async (req, res) => {
    const {coachID} = req.params;
    try {
        const queriedCoach = await Coach.findById(coachID);
        if (req.body.name != null) {
            queriedCoach.name = req.body.name;
        }
        if (req.body.birthdate != null) {
            queriedCoach.birthdate = req.body.birthdate;
        };
        if (req.body.group != null) {
            queriedCoach.group = req.body.group;
        };
        const updatedCoach = await queriedCoach.save();
        res.status(200).json({status: "success", data: updatedCoach});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const deleteCoach = async (req, res) => {
    const {coachID} = req.params;
    try {
        const deletedCoach = await Coach.findByIdAndRemove(coachID);
        res.status(204).json({status: "success", data: deletedCoach});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};


module.exports = {
    getAllCoaches,
    searchCoaches,
    getCoachWithID,
    addCoach,
    updateCoach,
    deleteCoach
};