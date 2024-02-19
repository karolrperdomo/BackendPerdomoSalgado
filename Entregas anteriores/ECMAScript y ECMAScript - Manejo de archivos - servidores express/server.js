const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const productManagerFileSystem = require('./src/productManagerFileSystem')
const productos = new productManagerFileSystem("products");

// http:// localhost:8080 /
app.get('/', (req, res)=> {
    res.send('<h1>Bienvenidos a mi primer server express<h1>') 
})

const router = express.Router();
app.use('/products', router);

// GET /productos  TODOS Pero Evaluando el Query - Limit
router.get('/', async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.params);

    const limit = parseInt(req.query.limit);
    
    console.log(limit)
   
    const products = await  productos.getProducts();  
    if (!limit) { 
        res.status(200).json(products)
    }else {
        res.send(products.slice(0,limit));
    }
})

// GET /productos/:id  PRODUCTOS POR ID
router.get('/:id', async (req, res) => {
    console.log(req.params);
    const {id} = req.params;
    console.log(id);
    
    
    const products = await  productos.getProductsById(id);  
    res.status(200).json(products)
    
    
})


app.listen(8080, ()=>{
    console.log('Escuchando en el puerto 8080')
} )