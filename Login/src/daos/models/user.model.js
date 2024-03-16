import { Schema, model } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const usersCollection = 'users'

const usersSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    }, 
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart' // Reemplaza 'Cart' con el nombre de tu modelo de carrito
    }
});

usersSchema.plugin(mongoosePaginate);

const userModel = model(usersCollection, usersSchema);

export default userModel;
