const mongoose = require('mongoose')

console.log("there")
let conn = null
console.log(mongoose.connections.length)
if(mongoose.connections.length<=1){
    console.log("if")
    conn = mongoose.createConnection("mongodb://localhost:27017",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },function (err){
        if(err){
            console.log("connection error")
            console.log(err)
        }else{
            console.log("connection done")
        }
    })
}else{
    console.log("else")
    conn = mongoose.connections[0]
}




module.exports = conn