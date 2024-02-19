import { Router } from 'express';
import mongoose from 'mongoose'; // Importa mongoose

import cartsModel from '../models/carts.model.js';

export const cartsRouter = Router();

cartsRouter
    .get('/carts', async (request, responses) => {
        try {
            const carts = await cartsModel.find({ isActive: true });
            responses.json({
                status: 'success',
                result: carts
            });
        } catch (error) {
            console.log(error);
            responses.status(500).json({
                status: 'error',
                error: 'Internal Server Error'
            });
        }
    })
    .post('/carts', async (request, responses) => {
        try {
            const { body } = request;
            const result = await cartsModel.create(body);
            responses.send({
                status: 'success',
                result
            });
        } catch (error) {
            console.log(error);
            responses.status(500).json({
                status: 'error',
                error: 'Internal Server Error'
            });
        }
    })
    .get('/carts/:cid', async (request, responses) => {
        try {
            const { cid } = request.params;
            const user = await cartsModel.findOne({ _id: cid });
            responses.json({
                status: 'success',
                result: user
            });
        } catch (error) {
            console.log(error);
            responses.status(500).json({
                status: 'error',
                error: 'Internal Server Error'
            });
        }
    })
    .put('/carts/:cid', async (request, responses) => {
        try {
            const { cid } = request.params;
            const objectIdCid = mongoose.Types.ObjectId(cid); // Convierte cid a un ObjectId válido
            // Aquí deberías agregar tu código para actualizar el carrito usando objectIdCid
            responses.send('update user');
        } catch (error) {
            console.log(error);
            responses.status(500).json({
                status: 'error',
                error: 'Internal Server Error'
            });
        }
    })
    .delete('/carts/:cid', async (request, responses) => {
        try {
            const { cid } = request.params;
            const objectIdCid = mongoose.Types.ObjectId(cid); // Convierte cid a un ObjectId válido
            const result = await cartsModel.findByIdAndUpdate({ _id: objectIdCid }, { isActive: false });
            responses.send('delete user');
        } catch (error) {
            console.log(error);
            responses.status(500).json({
                status: 'error',
                error: 'Internal Server Error'
            });
        }
    });
