import {Schema, model} from 'mongoose'

const cartsSchema = new Schema({
    product_name: String,
    price: Number,
    category: String,
    thumbnail: String,
    code: String,
    isActive: {
        type: Boolean,
        default: true
    }
})

export default model('carts', cartsSchema)