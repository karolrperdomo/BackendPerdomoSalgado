const express = require('express');
const router = express.Router();
const { getAllMessages, addMessage } = require('../dao/messageDao');

router.get('/', async (req, res) => {
    try {
        const messages = await getAllMessages();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los mensajes' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = await addMessage({ user, message });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el mensaje' });
    }
});

module.exports = router;
