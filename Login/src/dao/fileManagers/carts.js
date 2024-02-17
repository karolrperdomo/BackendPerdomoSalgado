import fs from  'fs';
import { v4 as uuidv4 } from 'uuid';
import __dirname from '../../utils.js';
const path = __dirname+'/files/carritos'

export default class CartManager {
    
    constructor(){
            this.path=path;
            this.id = 0;
            this.carts = [];
            this.getCarts();
    }


    async getAll(){
        
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            return data;
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    async getById(idC){
        console.log(idC);
        try{
            let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
            data = JSON.parse(data);
            let getData = data.find(c => c.id === idC);
            let error = (typeof(getData) === "undefined") ? 'error: Carrito no encontrado' : 'Carrito encontrado';
            console.error (error);
            return getData;
        }catch(err){
            return console.log('Error de lectura!', err);
        }
    }

    getCarts(){
        return this.carts;
    }
    
    async postCarts(idC, idP){
        // Si está vacío el array carts, id = 0 sino id = id++; 
        let data = await fs.promises.readFile(`./${this.path}.json`, 'utf-8');
        data = JSON.parse(data);
        /* let cartP = []; */
        let quantity = 1;
        try {
            let products = [];
                if(!(idC && idP)){

                   let idC = uuidv4();
                   let varCart = { "id": idC, "product": products}
                   data.push(varCart);
                   console.log("C")
                }else{
                    let product = {"id": idP, "quantity": 1};
                    let carrito = {};
                  
                        carrito = data.find(carrito => carrito.id === idC);
                     
                        data = data.filter(carrito => carrito.id !== idC);
                        let cartProducts=carrito.product;
                        if(!carrito){
                            
                            products.push(product);
                        }else{
                            let findProduct = []; 
                            findProduct = cartProducts.find(p=>p.id === idP);
                            if(findProduct){
                                
                                cartProducts = cartProducts.filter(p=> p.id !== idP);
                                let quantityP=findProduct.quantity;
                                let addProduct = quantityP + 1;
                                product = {"id": idP, "quantity": addProduct};
                                
                                cartProducts.push(product);
                            }else{
                               
                                cartProducts.push(product);
                            }
                        }        
                    let varCart = { "id": idC, "product": cartProducts}
                    data.push(varCart);
                    console.log("D")
                }         
            await fs.promises.writeFile(`./${this.path}.json`, JSON.stringify(data));
            return cart.idC;
        } catch(error) {
            console.log(`Hubo un error ${error}`);

        }
    }

}