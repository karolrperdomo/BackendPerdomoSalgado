import express from "express"

import UserManagerMongo from "../../daos/mongo/userManagerMongo.js"

import passport from "passport"

const router = express.Router()

const sessionService = new UserManagerMongo()


router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}) ,async (req, res)=>{

    res.redirect('/login');
});

router.get('/failregister', async (req, res) => {
    res.send({error: 'falla en el register'})
});

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin'}) ,async (req, res)=>{
    if (!req.user) return res.status(401).send({status: 'error', error: 'creadential invalid'})
    
    req.session.user = { 
        first_name: req.user.first_name, 
        last_name: req.user.last_name,
        email: req.user.email, 
        id: req.user._id,
        role: req.user.role
    }

    res.redirect('/api/products');
});

router.get('/faillogin', async (req, res) => {
    res.send({error: 'falla en el login'})
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {return res.status(401).send(error)}

    });
    res.redirect('/login'); //login
});

router.get('/current', async (req, res) => {
    res.send({message: 'datos sensibles'})
});

router.get('/github', passport.authenticate('github', {scope:['user:email']}),async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/api/sessions/login'} ),async (req, res) => {
    req.session.user = req.user
    res.redirect('/api/products')
});

export default router;