const express=require('express');
const adminMiddleware=require("../middleware/adminmiddleware")
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblems}=require("../controller/userProblem");
const userMiddleware=require("../middleware/usermiddleware");

const problemRouter=express.Router();

//Admin API endpoints
problemRouter.post("/create",adminMiddleware,createProblem);
problemRouter.put("/update/:id",adminMiddleware,updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem);

//User API endpoints
problemRouter.get("/problemById/:id",userMiddleware,getProblemById);
problemRouter.get("/getAllProblem",userMiddleware,getAllProblems);
problemRouter.get("/problemSolvedByUser",userMiddleware,solvedAllProblembyUser);

module.exports=problemRouter;