const fastify = require('fastify')
const conn = require('./database-config')
const app = fastify()

app.register(require('./route'))

require('./connectionFactory')

app.listen(8000,()=>{
    console.log("server running")

    

})