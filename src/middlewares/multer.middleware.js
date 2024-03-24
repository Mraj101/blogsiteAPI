const multer = require('multer');

console.log('inside multer middle ware');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

module.exports = multer({ 
    storage, 
})
