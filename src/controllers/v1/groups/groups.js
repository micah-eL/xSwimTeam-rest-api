let {Group, User} = require("../../../models/main");


const getAllGroups = async (req, res) => {
    try {
        const allGroups = await Group.find();
        res.status(200).json({status: "success", data: allGroups});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const searchGroups = async (req, res) => {
    const {name, limit} = req.query;
    try {
        let queriedGroups = await Group.find();
        if (name) {
            queriedGroups = queriedGroups.filter((group) => {
                return group.name === name;
            });
        }
        if (limit) {
            queriedGroups = queriedGroups.slice(0, Number(limit));
        }
        res.status(200).json({status: "success", data: queriedGroups});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const addGroup = async (req, res) => {
    const name = req.body.name;
    const oldGroup = await Group.findOne({name});
    if (oldGroup) {
        return res.status(409).json({status: "fail", data: "Group already exists."});
    }

    const newGroup = new Group(req.body);
    try {
        const addedGroup = await newGroup.save();
        res.status(201).json({status: "success", data: addedGroup});
    } catch(err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const updateGroup = async (req, res) => {
    const {groupID} = req.params;
    try {
        const queriedGroup = await Group.findById(groupID);
        if (req.body.name != null) {
            const name = req.body.name;
            const oldGroup = await Group.findOne({name});
            if (oldGroup) {
                return res.status(409).json({status: "fail", data: `There already exists a group with the name '${group}'.`});
            } else {
                const oldGroupName = queriedGroup.name;
                const newGroupName = req.body.name
                queriedGroup.name = newGroupName;
                let queriedUsers = await User.find({group: oldGroupName});
                for (var i = 0; i < queriedUsers.length; i++) {
                    queriedUsers[i].group = newGroupName;
                    await queriedUsers[i].save();
                }
            }
        }
        if (req.body.groupInfo != null) {
            queriedGroup.groupInfo = req.body.groupInfo;
        }
        if (req.body.practices != null) {
            queriedGroup.practices = req.body.practices;
        };
        const updatedGroup = await queriedGroup.save();
        res.status(200).json({status: "success", data: updatedGroup});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const deleteGroup = async (req, res) => {
    const {groupID} = req.params;

    try {
        let queriedGroup = await Group.findById(groupID);
        const groupName = queriedGroup.name;
        let queriedUsers = await User.find({group: groupName});
        for (var i = 0; i < queriedUsers.length; i++) {
            queriedUsers[i].group = "null";
            await queriedUsers[i].save();
        }
        
        const deletedGroup = await Group.findByIdAndRemove(groupID);
        res.status(204).json({status: "success", data: deletedGroup});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};


module.exports = {
    getAllGroups,
    searchGroups,
    addGroup,
    updateGroup,
    deleteGroup
};