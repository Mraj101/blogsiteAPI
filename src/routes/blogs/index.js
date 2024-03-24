const express = require('express')
const router=express.Router();

const blogController = require('../../controllers/blogs/index.js');
const multerMiddleware = require('../../middlewares/multer.middleware.js');

router.post("/crt",multerMiddleware.single('img'),blogController.creatBlogs);
router.post("/get", blogController.getUserBlogs);
router.get("/getAll", blogController.getAll);
router.get("/getSingle/:id", blogController.getSingleBlog);


module.exports = router