const {get_user,get_connection} = require('./controller')

module.exports = (fastifyApp,opts,done)=>{
    fastifyApp.get('/users',get_user)
    fastifyApp.get('/conn',get_connection)
    done()
}