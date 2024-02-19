import { Router } from 'express';
import ProductManager from '../dao/controllers/mongo/ProductManagerMongo.js';
import { __dirname } from "../utils.js"

const pm = new ProductManager()
const viewsRouter = Router()


viewsRouter.get("/",async(req,res)=>{
    const listadeproductos=await pm.getProductsView()
    res.render("home",{listadeproductos})
})

viewsRouter.get("/realtimeProducts",(req,res)=>{
res.render("realtimeProducts")
})

viewsRouter.get("/chat",(req,res)=>{
res.render("chat")
})

export default viewsRouter