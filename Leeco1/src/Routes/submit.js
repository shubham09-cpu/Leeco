const express=require('express');
const submitRouter=express.Router();
const userMiddleware = require('../middleware/usermiddleware');
const {submitCode}=require("../controller/userSubmission");

submitRouter.post("/submit/:id",userMiddleware,submitCode);


module.exports=submitRouter; 