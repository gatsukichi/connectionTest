const mongoose = require('mongoose');


const PetSchema = new mongoose.Schema({
    name:{
        type:String
    },
    animal : {
        type:String,
        enum:["cat",'dog']
    },
    
})


module.exports = PetSchema