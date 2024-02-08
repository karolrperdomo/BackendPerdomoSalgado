import { Router } from 'express';
import ProductManager from '../dao/managers/ProductManagerMongo.js';
import { __dirname } from "../utils.js"
import { productsModel } from '../models/products.model.js';

const pm = new ProductManager()
const viewsRouter = Router()


viewsRouter.get("/products", async(req,res)=>{
    const {limit = 2, pageQuery = 1} =req.query
        const{
            docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        }= await productsModel.paginate({}, {limit, page: pageQuery, sort: {price:-1}, lean:true})
        res.render("home", {
            listadeproductos: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page
        })
})

viewsRouter.get("/realtimeProducts",(req,res)=>{
res.render("realtimeProducts")
})


export default viewsRouter