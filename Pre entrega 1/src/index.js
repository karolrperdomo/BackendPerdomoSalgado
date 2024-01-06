import express from 'express'
import ProdRouter from './router/product.routes.js'
import CartRouter from './router/cart.routes.js'

const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/products", ProdRouter)
app.use("/api/carts", CartRouter)

app.listen(PORT,()=>{
    console.log(`Servidor Express Puerto ${PORT}`)
})