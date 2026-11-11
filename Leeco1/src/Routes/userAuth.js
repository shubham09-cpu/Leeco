const express=require('express');
const userMiddleware=require("../middleware/usermiddleware");
const adminMiddleware=require("../middleware/adminmiddleware");

const authRouter = express.Router();
const {register,login,logout,adminRegister}=require('../controller/userAuthent');

//Register
authRouter.post('/register',register);
//Login
authRouter.post('/login',login);
//Logout
authRouter.post('/logout',userMiddleware,logout);
authRouter.post('/admin/register',adminMiddleware,adminRegister); 
//GetProfile
// authRouter.post('/getProfile',getProfile);

module.exports=authRouter;