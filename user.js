const mongoose =  require('mongoose')

const UserSchema =  new mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender : {
        type:String
    }
})

module.exports = UserSchema