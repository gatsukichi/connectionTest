const conn = require('./database-config')



conn.model('User',require('./user'))
conn.model('Pet',require('./pet'))


module.exports = {
    ...conn.models
    
}