import express from 'express';
import userModel from '../daos/models/user.model.js'


const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')
})

router
    .get('/', async (request, responses)=>{
        try {
            const {limit = 5, pageQuery = 1} = request.query
            const {
                docs,
                hasPrevPage, 
                hasNextPage,
                prevPage, 
                nextPage,
                page 
                } = await userModel.paginate({isActive: true}, {limit, page: pageQuery, sort: {first_name: -1}, lean: true})
                responses.render('users', {
                    users: docs,
                    hasPrevPage, 
                    hasNextPage,
                    prevPage, 
                    nextPage,
                    page,
                })
            } catch (error) {
                console.log(error)
            }
    })
    .post('/', async (request, responses)=>{
        try {
            const { body } = request
            const result = await userModel.create(body)

            responses.send({
                status: 'success',
                result
            })
        } catch (error) {
            console.log(error)
        }
    })
    .get('/:uid', async (request, responses)=>{
        try {
            const { uid } = request.params
            const user = await userModel.findOne({_id: uid})
            responses.json({
                status: 'success',
                result: user
            })
        } catch (error) {
            console.log(error)
        }
    })
    .put('/:uid', async (request, responses)=>{
        try {
            responses.send('update user')
        } catch (error) {
            console.log(error)
        }
    })
    .delete('/:uid', async (request, responses)=>{
        try {
            const {uid} = request.params
            const result = await userModel.findByIdAndUpdate({_id:uid}, {isActive: false})
            responses.send('delete user')
        } catch (error) {
            console.log(error)
        }
    })

router.get('/list', async (req, res) => {
        try {
            const {limit = 5, pageQuery = 1} = req.query
            const {
                docs,
                hasPrevPage, 
                hasNextPage,
                prevPage, 
                nextPage,
                page 
            } = await userModel.paginate({}, {limit, page: pageQuery, sort: {first_name: -1}, lean: true})
            console.log(page)
            res.render('users', {
                users: docs,
                hasPrevPage, 
                hasNextPage,
                prevPage, 
                nextPage,
                page 
            })
        } catch (error) {
            console.log(error)
        }
    })

export default router;