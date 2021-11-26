let {Swimmer} = require("../../../models/main");


const getAllSwimmers = async (req, res) => {
    try {
        const allSwimmers = await Swimmer.find();
        res.status(200).json({status: "success", data: allSwimmers});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const searchSwimmers = async (req, res) => {
    const {group, limit} = req.query;
    try {
        let queriedSwimmers = await Swimmer.find();
        if (group) {
            queriedSwimmers = queriedSwimmers.filter((user) => {
                return user.group === group;
            });
        }
        if (limit) {
            queriedSwimmers = queriedSwimmers.slice(0, Number(limit));
        }
        res.status(200).json({status: "success", data: queriedSwimmers});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
}; 

const getSwimmerWithID = async (req, res) => {
    const {swimmerID} = req.params;
    try {
        const queriedSwimmer = await Swimmer.findById(swimmerID);
        res.status(200).json({status: "success", data: queriedSwimmer});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const addSwimmer = async (req, res) => {
    const newSwimmer = new Swimmer(req.body);
    try {
        const addedSwimmer = await newSwimmer.save();
        res.status(201).json({status: "success", data: addedSwimmer});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const updateSwimmer = async (req, res) => {
    const {swimmerID} = req.params;
    try {
        const queriedSwimmer = await Swimmer.findById(swimmerID);
        if (req.body.name != null) {
            queriedSwimmer.name = req.body.name;
        }
        if (req.body.age != null) {
            queriedSwimmer.age = req.body.age;
        };
        if (req.body.group != null) {
            queriedSwimmer.group = req.body.group;
        };
        const updatedSwimmer = await queriedSwimmer.save();
        res.status(200).json({status: "success", data: updatedSwimmer});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const deleteSwimmer = async (req, res) => {
    const {swimmerID} = req.params;
    try {
        const deletedSwimmer = await Swimmer.findByIdAndRemove(swimmerID);
        res.status(204).json({status: "success", data: deletedSwimmer});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};


module.exports = {
    getAllSwimmers,
    searchSwimmers,
    getSwimmerWithID,
    addSwimmer,
    updateSwimmer,
    deleteSwimmer
};

