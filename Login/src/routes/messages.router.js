import {Router} from 'express'

const router = Router()

router.get('/', (resquest, response) => {
    response.render('messages', {})
})

export default router