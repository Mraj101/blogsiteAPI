const userRoutes = require('./routes/user/index.js')
const blogRoutes = require('./routes/blogs/index.js')
const commentRoutes = require('./')
const {app} = require('./app.js')

module.exports = function(){
    app.use('/api/v1/newuser',userRoutes)
    app.use('/api/v1/blogs',blogRoutes)
    app.user('/api/v1/comments',commentRoutes)
}
