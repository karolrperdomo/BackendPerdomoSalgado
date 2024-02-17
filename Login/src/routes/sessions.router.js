import { Router } from "express";
import userModel from "../dao/models/user.model.js";

const router = Router();

router.post('/register', async (req, res) => {
    const {first_name, last_name, email, age, password} = req.body;
    let role = 'user';
    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(404).send({status: 'error', error: 'Valores incompletos.'});
    }
    const exists = await userModel.findOne({email: email});
    if(exists) {return res.status( 400 ).send({status: 'error', error: 'El usuario ya existe.'});}
  
    if (email === 'karol.rperdomo@gmail.com' && password === 'krp2024+') {
        role = 'admin';
    }
    const result = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password,
        role
    })
    res.send({status: 'success', payload: result});

});

router.post('/login', async (req, res) => {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(404).send({status: 'error', error: 'Valores incompletos.'});
    }

    const user = await userModel.findOne({email, password});
    if(!user) {
        return res.status( 400 ).send({status: 'error', error: 'El usuario o la contraseña son invalidos.'});
    }else{
        if (user.role === 'admin'){ 
            req.session.admin=true;
        }
        req.session.user = {id: user._id, email: user.email, name: user.first_name, age: user.age, role: user.role};
        res.send({status:'Success', message:'Usuario logueado.'});
    } 
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) {
            res.render('login', {mensaje: 'Sesión cerrada.'})
        }else{
            res.send({status: "No pudo cerrar sesion", body:err});
        } 
    });
})

export default router;