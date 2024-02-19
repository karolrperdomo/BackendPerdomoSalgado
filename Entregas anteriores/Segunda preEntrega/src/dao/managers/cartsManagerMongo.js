import cartsModel from "../../../models/carts.model.js";

class cartManagerMongo {
    async getCarts(){
        return await cartsModel.find({})
    }
    async getCart(cid){
        return await cartsModel.findOne({_id: cid})
    }
    async createCarts(cartNew){
        
        return await cartsModel.create(cartNew)
    }
    async updateCart(){}
    async deleteCart(){}
}

export default cartManagerMongo