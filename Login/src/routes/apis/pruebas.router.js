import express from "express"

const router = express.Router()


router.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter++
        res.send(`Usted ha visitado el sito ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido a la página.')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.send('Logout error')
        res.send({status: 'success', message: 'Logout ok'})
    })
})

router.get('/setCookie', (req, res) => {
    res.cookie('CoderCookie', 'esta es una cookie', {maxAge: 100000}).send('seteando cookie')
})
router.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})
router.get('/setCookieSigned', (req, res) => {
    res.cookie('CoderCookie', 'esta es una cookie firmada', {maxAge: 100000, signed: true}).send('seteando cookie')
})
router.get('/getcookieSigned', (req, res) => {
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})
router.get('/deletecookie', (req, res) => {
    res.clearCookie('CoderCookie').send('cookie borrada')
})


export default router;