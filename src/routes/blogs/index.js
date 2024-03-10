const express = require('express')
const router=express.Router();

const blogController = require('../../controllers/blogs/index.js')

router.post("/crt", blogController.creatBlogs);
// router.post("/", delete);


module.exports = router