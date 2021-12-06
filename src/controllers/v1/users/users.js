var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

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
    try {
        const {firstname, lastname, email, password, role, birthdate, group} = req.body;
        
        const oldUser = await User.findOne({email});
        if (oldUser) {
            return res.status(409).json({status: "fail", data: "User already exists."});
        }
        
        encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            lastname,
            firstname,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role,
            birthdate,
            group
        });
        const authtoken = jwt.sign({
            userID: newUser._id, email
        },
        process.env.TOKEN_KEY, {
            expiresIn: "2h"
        });
        newUser.authtoken = authtoken;
        res.status(201).json({status: "success", data: newUser});
    } catch(err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).json({status: "fail", data: "Email and password required."});
        }
        
        const user = await User.findOne({email});
        if (user && (await bcrypt.compare(password, user.password))) {
            const authtoken = jwt.sign({
                userID: user._id, email
            },
            process.env.TOKEN_KEY, {
                expiresIn: "2h"
            });
            user.authtoken = authtoken;
        }
        
        res.status(201).json({status: "success", data: user});
    } catch(err) {
        res.status(400).json({status: "fail", data: err.message});
    }
};

const updateUser = async (req, res) => {
    const {userID} = req.params;
    try {
        const queriedUser = await User.findById(userID);
        if (req.body.lastname != null) {
            queriedUser.lastname = req.body.lastname;
        }
        if (req.body.firstname != null) {
            queriedUser.firstname = req.body.firstname;
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
    loginUser,
    updateUser,
    deleteUser
};