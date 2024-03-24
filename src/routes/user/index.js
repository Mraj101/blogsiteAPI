const express = require('express')
const router=express.Router();
const { verifyJWT }= require('../../middlewares/user.auth.middleware.js')
const userControllers =require('../../controllers/user/index.js');
const multerMiddleware = require('../../middlewares/multer.middleware.js');


router.post("/crt",multerMiddleware.single('img'),userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.post("/logout",verifyJWT, userControllers.logoutUser);
router.post("/refresh-AccessToken",userControllers.refreshAccessToken)
router.post("/changeCurrentPassword",verifyJWT,userControllers.changeCurrentPassword)

module.exports = router