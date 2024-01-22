const express = require('express');
const { userModel } = require('../models/users.models');
const router = express.Router();

// READ
router.get('/', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener los usuarios' });
    }
});

router.get('/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await userModel.findOne({ _id: uid });
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el usuario por ID' });
    }
});

// CREATE
router.post('/', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const userNew = {
        first_name,
        last_name,
        email,
        password,
    };

    try {
        const result = await userModel.create(userNew);
        res.status(200).send({
            status: 'success',
            usersCreate: result,
        });
    } catch (error) {
        res.status(500).send({ error: 'Error al crear el usuario' });
    }
});

// UPDATE
router.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const userToUpdate = req.body;

    try {
        const result = await userModel.findOneAndUpdate({ _id: uid }, userToUpdate, { new: true });
        res.status(200).send({
            status: 'success',
            message: result,
        });
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar el usuario' });
    }
});

// DELETE
router.delete('/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const result = await userModel.findByIdAndDelete({ _id: uid });
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar el usuario' });
    }
});

module.exports = router;
