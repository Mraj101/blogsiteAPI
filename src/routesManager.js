const userRoutes = require('./routes/user/index.js')
const blogRoutes = require('./routes/blogs/index.js')
const commentRoutes = require('./routes/comments/index.js')
const ratingRoutes = require('./routes/ratings/index.js')
const {app} = require('./app.js')

module.exports = function(){
    app.use('/api/v1/newuser',userRoutes);
    app.use('/api/v1/blogs',blogRoutes);
    app.use('/api/v1/comments',commentRoutes);
    app.use('/api/v1/ratings',ratingRoutes);
}
