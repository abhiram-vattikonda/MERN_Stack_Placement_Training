const userModel = require("../models/user.model");

const createUser = async (userData) => {
    if (!userData.name) throw new Error("Name is required");
    if (!userData.email) throw new Error("Email is required");

    return await userModel.createUser(userData);
};

const getAllUsers = async () => {
    return await userModel.getAllUsers();
};

const getUserByID = async (id) => {
    const user = await userModel.getUserByID(id);
    if (!user) throw new Error("User not found");
    return user;
};

const updateUser = async (id, data) => {
    const result = await userModel.updateUser(id, data);
    if (result.matchedCount === 0) throw new Error("User not found");
    return result;
};

const deleteUser = async (id) => {
    const result = await userModel.deleteUser(id);
    if (result.deletedCount === 0) throw new Error("User not found");
    return result;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
};
