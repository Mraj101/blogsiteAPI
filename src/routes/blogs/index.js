const express = require('express')
const router=express.Router();

const blogController = require('../../controllers/blogs/index.js');
const multerMiddleware = require('../../middlewares/multer.middleware.js');

router.post("/crt",multerMiddleware.single('img'),blogController.creatBlogs);
router.get("/get", blogController.getAllBlogs);
router.get("/getSingle/:id", blogController.getSingleBlog);


module.exports = router