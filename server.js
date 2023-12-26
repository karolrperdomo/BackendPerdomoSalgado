const express = require('express')

//ejecutar
const app = express()

//escuchar peticiones del lado del cliente que sean get
//htp://localhost:8080
//cuando escuche una peticion al enpoint que responda bienvenido
app.get('/',(req, res)=>{
    //console.log(req) //Objeto que viene desde el cliente
    console.log(req.body)
    console.log(req.params)
    console.log(req.query)

    res.send('Bienvenidos a mi primer server express')
})

//htp://localhost:8080/saludo
app.get('/saludo',(req, res)=>{
    res.send('Bienvenidos saludo')
})

//htp://localhost:8080/users
app.get('/users',(req, res)=>{
    res.send({
        nombre: 'Karol',
        apellido: 'Perdomo'
    })
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
})

app.listen(8000, ()=>{
    console.log('Escuchando en el puerto 8000')
})