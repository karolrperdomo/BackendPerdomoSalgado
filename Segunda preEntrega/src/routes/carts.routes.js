import { Router } from 'express'
import cartsModel from '../models/carts.model.js'
export const cartsRouter = Router()

cartsRouter
    .get('/carts', async (request, responses)=>{
        try {
            const carts = await cartsModel.find({isActive: true})
            responses.json({
                status: 'success',
                result: carts
            })
        } catch (error) {
            console.log(error)
        }
    })
    .post('/carts', async (request, responses)=>{
        try {
            const { body } = request
            const result = await cartsModel.create(body)

            responses.send({
                status: 'success',
                result
            })
        } catch (error) {
            console.log(error)
        }
    })
    .get('/carts/:cid', async (request, responses)=>{
        try {
            const { cid } = request.params
            const user = await cartsModel.findOne({_id: cid})
            responses.json({
                status: 'success',
                result: user
            })
        } catch (error) {
            console.log(error)
        }
    })
    .put('/carts/:cid', async (request, responses)=>{
        try {
            responses.send('update user')
        } catch (error) {
            console.log(error)
        }
    })
    .delete('/carts/:cid', async (request, responses)=>{
        try {
            const {cid} = request.params
            const result = await cartsModel.findByIdAndUpdate({_id:cid}, {isActive: false})
            responses.send('delete user')
        } catch (error) {
            console.log(error)
        }
    })
