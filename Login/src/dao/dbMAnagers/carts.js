import { cartModel } from '../models/cart.model.js';
import { productModel } from '../models/product.model.js';


export default class Carts{
    constructor(){
        console.log("Trabajando con MongoDB")
    }
    getById = async(idC) => {
        try{
            console.log(idC);
            let cart = await cartModel.findOne({_id:idC}).lean().populate('products.product');
            return cart
        }catch(error){
            console.log ("No se pudo traer los carritos " + error)
        }
    };

    postCarts = async() => {
        try{ 
            let products = [];
            let cart = await cartModel.create({products});
            return cart
        }catch(error){
            console.log ("No se pudo crear el carrito " + error)
        }
    };

    post = async(idC, idP) => {
        try{
            let quantity = 1; 
            let product = await productModel.find({_id:idP});
            if (!product) {
                return res.status(404).json({error: true , message:'El producto no existe.'});
            }
            let cart = await cartModel.find({_id: idC});
            let productsCart = cart[0].products;
            if (!cart) {
                return res.status(404).json({error: true , message:'El carrito no existe.'});
            }else{
                if((productsCart).length===0){
             
                    let carts = await cartModel.updateOne({_id: idC}, {$set:{products: {product: idP, quantity:1}}});
                    return carts
                }else{
             
                    let carts = await cartModel.updateOne({_id: idC, products: {$elemMatch: {product: {$eq:idP}}}}, {$inc:{"products.$.quantity":quantity}});
                    if(carts.matchedCount===0){
                        let newProduct = [{ "product":idP, "quantity":quantity}]
                        
                        let carts = await cartModel.updateOne({_id: idC}, {$push:{products:{$each:newProduct}}});
                        return carts
                    }
                    return carts    
                } 
            }
        }catch(error){
            console.log ("No se pudo agregar el producto al carrito " + error)
        }    
    }

    putProduct = async(idC, items) => {
        try {
            let cart = await cartModel.find({_id:idC});
            if (!cart){
                return res.status(404).json({error: true , message:'El carrito no existe.'});
            }else{
                    await cartModel.updateOne({_id: idC }, {$unset : {"products":1}});
                    cart = await cartModel.updateOne({_id: idC }, {$set : {"products":items}});
                    return cart          
            }

        } catch (error) {
            console.log ("No se pudo modificar el carrito " + error)
        }
    }

    putProducts = async(idC, idP, item) => {
        try {
            let cart = await cartModel.find({_id:idC});
            if (!cart){
                return res.status(404).json({error: true , message:'El carrito no existe.'});
            }else{
                    let number = item.findIndex(item => item.product === idP);
                    let quantityP = item[number].quantity;
                    cart = await cartModel.updateOne({_id: idC, products: {$elemMatch: {product: {$eq:idP}}}}, {$set:{"products.$.quantity":quantityP}});
                    return cart     
            }
        } catch (error) {
            console.log ("No se pudo modificar el carrito " + error)
        }
    }

    deleteProduct = async(idC, idP) => {
        try{
            let product = await productModel.find({_id:idP});
            if (!product) {
                return res.status(404).json({error: true , message:'El producto no existe.'});
            }
            let cart = await cartModel.find({_id: idC});
            let productsCart = cart[0].products;
            if (!cart) {
                return res.status(404).json({error: true , message:'El carrito no existe.'});
            }else{
                
                if((productsCart).length===0){
                    console.log("Carrito vacio");
                    return
                }else{
                    console.log("Carrito con productos");
                    let cart = await cartModel.updateOne({
                        _id: idC,
                      },
                      {
                        $pull: {
                          products: {
                             product: idP,
                          },
                        },
                      }
                    );
                    return cart    
                } 
            }
        }catch{
            console.log ("No se pudo borrar el producto del carrito. " + error)
        } 
    }

    deleteProducts = async(idC) => {
        try{
            let cart = await cartModel.find({_id: idC});
            let productsCart = cart[0].products;
            if (!cart) {
                return res.status(404).json({error: true , message:'El carrito no existe.'});
            }else{
              
                if((productsCart).length===0){
                 
                    return
                }else{
                
                    let cart = await cartModel.updateOne({_id: idC }, {$unset : {"products":1}});
                    return cart   
                } 
            }
        }catch{
            console.log ("No se pudo borrar los productos del carrito. " + error)
        } 
    }
}