const express = require('express')
const router=express.Router();
const { verifyJWT }= require('../../middlewares/user.auth.middleware.js')
const blogController = require('../../controllers/blogs/index.js')

router.post("/crt", blogController.creatBlogs);
router.post("/login", loginUser);
router.post("/logout",verifyJWT, logoutUser);
router.post("/refresh-AccessToken",refreshAccessToken)
router.post("/changeCurrentPassword",verifyJWT,changeCurrentPassword)

module.exports = router