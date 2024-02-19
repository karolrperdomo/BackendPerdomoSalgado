import userModel from "../../daos/models/user.model.js";

class UserManagerMongo {
    async getUsersPaginate(limit=10, page=1){
        return await userModel.paginate({},{limit, page, lean: true})
    }
    async getUsers(){
        return await userModel.find({})
    }
    async getUser(uid){
        return await userModel.findOne({_id: uid})
    }
    async getUserBy(filter){
        return await userModel.findOne(filter)
    }
    async createUser(userNew){
        return await userModel.create(userNew)
    }
    async updateUser(uid, userUpdate){
        return await userModel.findByIdAndUpdate({_id: uid}, userUpdate)
    }
    async deleteUser(uid){
        return await userModel.findByIdAndDelete({_id: uid})
    }
}

export default UserManagerMongo