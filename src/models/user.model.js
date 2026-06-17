const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const userCollection = () => {
    return getDB().collection("users");
};

const createUser = async (userData) => {
    return await userCollection().insertOne(userData);
};

const getAllUsers = async () => {
    return await userCollection().find().toArray();
};

const getUserByID = async (id) => {
    return await userCollection().findOne({
        _id: new ObjectId(id),
    });
};

const updateUser = async (id, data) => {
    return await userCollection().updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
};

const deleteUser = async (id) => {
    return await userCollection().deleteOne({
        _id: new ObjectId(id),
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
};
