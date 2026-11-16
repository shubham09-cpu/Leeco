const express=require('express');
const userMiddleware = require('../middleware/usermiddleware');
const submitRouter=express.Router();
const {submitCode}=require("../controller/userSubmission");

submitRouter.post("/submit/:id",userMiddleware,submitCode);