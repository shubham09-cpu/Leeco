const express=require('express');
const adminMiddleware=require("../middleware/adminmiddleware")

const problemRouter=express.Router();

//Admin API endpoints
problemRouter.post("/create",adminMiddleware,CreateProblem);
problemRouter.patch("/:id",UpdateProblem);
problemRouter.delete("/:id",DeleteProblem);

//User API endpoints
problemRouter.get("/:id",getProblemById);
problemRouter.get("/",getAllProblems);
problemRouter.get("/user",solvedAllProblembyUser);