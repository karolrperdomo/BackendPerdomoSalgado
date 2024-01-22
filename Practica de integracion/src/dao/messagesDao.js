const Message = require('../models/messageModel');

async function getAllMessages() {
    try {
        const messages = await Message.find();
        return messages;
    } catch (error) {
        throw error;
    }
}

async function addMessage({ user, message }) {
    try {
        const newMessage = await Message.create({ user, message });
        return newMessage;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllMessages,
    addMessage,
};
