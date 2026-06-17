const userService = require("../services/user.service");

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error("CREATE USER ERROR:", error.stack);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    console.log("HANDLER REACHED: getAllUsers");
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error("GET ALL USERS ERROR:", error.stack);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserByID = async (req, res) => {
    try {
        const user = await userService.getUserByID(req.params.id);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const result = await userService.updateUser(req.params.id, req.body);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
};
