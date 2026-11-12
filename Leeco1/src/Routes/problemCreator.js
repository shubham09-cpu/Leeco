const express=require('express');

const problemRouter=express.Router();

//Admin API endpoints
problemRouter.post("/create",problemCreate);
problemRouter.patch("/:id",problemUpdate);
problemRouter.delete("/:id",problemDelete);

//User API endpoints
problemRouter.get("/:id",problemFetch);
problemRouter.get("/",getAllProblems);
problemRouter.get("/user",solvedProblem);