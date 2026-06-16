const users = require("../models/user.models")
const userService = require("../services/user.services")

const getUsers = (req, res) => {
    const users = userService.getAllUsers();
    res.json(users);
};

const createUser = (req, res) => {
    const { roll, name, email} = req.body;
    const user = userService.createUser(roll, name, email);
    res.status(201).json(user);
}


const getUserByRoll = (req, res) => {
    const user = userService.getUserByRoll(req.params.roll)

    if (!user) {
        return res.status(404).json({message : "User Not Found"})
    }

    res.json(user)
}

module.exports = {
    getUsers,
    createUser,
    getUserByRoll,
}