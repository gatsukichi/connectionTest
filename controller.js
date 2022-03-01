const {User,Pet} = require('./connectionFactory')
const mongoose = require('mongoose')

module.exports = {
    get_user :async (request,reply)=>{
        try{
            console.log("he")
            const users = await User.findOne({})
            console.log(users)
            return await reply.code(200).send({
                success:true,
                users
            })

        }catch(err){
            console.log(err)
            
            return await reply.code(500).send({
                success:false,
                err:err.message
            })
        }
    },
    get_connection: async(request,reply)=>{
        const connections = mongoose.connections.length
        return await reply.code(200).send({
            success:true,
            connections
        })
    }
}
