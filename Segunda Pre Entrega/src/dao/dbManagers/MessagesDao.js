const messageModel = require ('../models/message.model');

class Messages{

    async post(item){
        console.log(item);
        let{user, message} =item;
        console.log(user, message);
        if ( !message || !user)
        res.send ({status :"error" , error:" Info Incompleta"})
        let result =await messageModel.create({
            user,
            message
        })
        return result
    }
}

module.exports = Messages;