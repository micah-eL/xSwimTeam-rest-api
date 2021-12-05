let {User} = require("../../../models/main");


const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({status: "success", data: allUsers});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const searchUsers = async (req, res) => {
    const {role, group, limit} = req.query;
    try {
        let queriedUsers = await User.find();
        if (role) {
            queriedUsers = queriedUsers.filter((user) => {
                return user.role === role;
            });
        }
        if (group) {
            queriedUsers = queriedUsers.filter((user) => {
                return user.group === group;
            });
        }
        if (limit) {
            queriedUsers = queriedUsers.slice(0, Number(limit));
        }
        res.status(200).json({status: "success", data: queriedUsers});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const getUserWithID = async (req, res) => {
    const {userID} = req.params;
    try {
        const queriedUser = await User.findById(userID);
        res.status(200).json({status: "success", data: queriedUser});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const addUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const addedUser = await newUser.save();
        res.status(201).json({status: "success", data: addedUser});
    } catch(err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const updateUser = async (req, res) => {
    const {userID} = req.params;
    try {
        const queriedUser = await User.findById(userID);
        if (req.body.name != null) {
            queriedUser.name = req.body.name;
        }
        if (req.body.role != null) {
            queriedUser.role = req.body.role;
        }
        if (req.body.birthdate != null) {
            queriedUser.birthdate = req.body.birthdate;
        };
        if (req.body.group != null) {
            queriedUser.group = req.body.group;
        };
        const updatedUser = await queriedUser.save();
        res.status(200).json({status: "success", data: updatedUser});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const deleteUser = async (req, res) => {
    const {userID} = req.params;
    try {
        const deletedUser = await User.findByIdAndRemove(userID);
        res.status(204).json({status: "success", data: deletedUser});
    } catch (err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};


module.exports = {
    getAllUsers,
    searchUsers,
    getUserWithID,
    addUser,
    updateUser,
    deleteUser
};