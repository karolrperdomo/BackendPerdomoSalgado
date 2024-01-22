const mongoose = require('mongoose');
const User = require('../models/userModel'); // Asegúrate de tener el modelo correcto aquí

async function getAllUsers() {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw error;
    }
}

async function createUser(newUser) {
    try {
        const createdUser = await User.create(newUser);
        return createdUser;
    } catch (error) {
        throw error;
    }
}

async function updateUser(userId, updatedFields) {
    try {
        await User.findByIdAndUpdate(userId, updatedFields);
    } catch (error) {
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        throw error;
    }
}

// Puedes agregar otras operaciones según sea necesario

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    // Agrega otras funciones según sea necesario
};
