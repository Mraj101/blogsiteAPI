const userRoutes = require('./routes/user/index.js')
const {app} = require('./app.js')

module.exports = function(){
    app.use('/api/v1/newuser',userRoutes)
}