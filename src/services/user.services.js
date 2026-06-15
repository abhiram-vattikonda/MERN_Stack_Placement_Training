const users = require("../models/user.models")

const getAllUsers = () => {
    return users;
};


const createUser = (roll, name, email) => {
    const user = {
        id: Date.now(),
        roll,
        name,
        email,
    };

    users.push(user)
    return user;
};

const getUserByRoll = (roll) => {
    const user = users.find((user) => user.roll == Number(roll));

    if (!user)
        return null;

    return user;
};

function updateUserByRoll (roll, data) {
    const user = users.find((user) => user.roll == Number(roll));

    if (!user)
        return null;

    user.name = data.name;
    user.email = data.email;

    return user;  
}

module.exports = {
    getAllUsers,
    createUser,
}