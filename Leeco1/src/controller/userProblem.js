const { getLanguageById, submitBatch, submitToken } = require("../utils/Problemutility");
const Problem = require("../models/problem");
const User = require("../models/user");
const Submission=require("../models/submission");

const createProblem = async (req, res) => {

    const {
        title,
        description,
        difficulty,
        tags,
        visibleTestCases,
        hiddenTestCases,
        startCode,
        referenceSolution,
    } = req.body;


    try {

        for (const { language, CompleteCode } of referenceSolution) {

            const languageId = getLanguageById(language);

            if (!languageId) {
                return res.status(400).send(`Unsupported language: ${language}`);
            }

            const submissions = visibleTestCases.map((testcase) => ({
                source_code: CompleteCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output,
            }));

            const submitResult = await submitBatch(submissions);
            const resultToken = submitResult.map((value) => value.token);
            const testResult = await submitToken(resultToken);

            for (const test of testResult) {
                
                if (test.status_id != 3) {
                    return res.status(400).send(`Test case failed with status: ${test.status?.description || test.status_id}`);
                }

            }
        }

        // Store in DB using ...req.body
        await Problem.create({
            ...req.body,
            problemCreator: req.result._id,
        });

        res.status(201).send("Problem Saved Successfully");
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
};

const updateProblem = async (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        difficulty,
        tags,
        visibleTestCases,
        hiddenTestCases,
        startCode,
        referenceSolution,
    } = req.body;

    try {

        if(!id){
            return res.status(400).send("Missing ID Field");
        }

        const DsaProblem = await Problem.findById(id);
        if(!DsaProblem){
            return res.status(404).send("ID is not present in server");
        }

        for (const { language, CompleteCode } of referenceSolution) {
            const languageId = getLanguageById(language);

            if (!languageId) {
                return res.status(400).send(`Unsupported language: ${language}`);
            }

            const submissions = visibleTestCases.map((testcase) => ({
                source_code: CompleteCode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output,
            }));

            const submitResult = await submitBatch(submissions);
            const resultToken = submitResult.map((value) => value.token);
            const testResult = await submitToken(resultToken);

            for (const test of testResult) {
                if (test.status_id != 3) {
                    return res.status(400).send(`Test case failed with status: ${test.status?.description || test.status_id}`);
                }
            }
        }

        const newProblem = await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});
        res.status(200).send(newProblem);

    }
    catch (err) {
        res.status(500).send(err);
    }
}

const deleteProblem=async(req,res)=>{

    const {id}=req.params;
    try{
        if(!id)
            return res.status(404).send("Id is Missing");

        const deletedProblem=await Problem.findByIdAndDelete(id);

        if(!deletedProblem)
            return res.status(404).send("Problem is Missing");

        res.status(200).send("Deleted Successfully");
    }
    catch(err){
        res.status(404).send(err);
    }
}

const getProblemById=async(req,res)=>{
    const {id}=req.params;

    try{
        if(!id)
            return res.status(400).send("Id is missing");

        const getProblem=await Problem.findById(id).select('_id title description diffculty tags visibleTestCases startCode referenceSolution');

        if(!getProblem)
            return res.status(404).send("Problem is Missing");

        res.status(200).send(getProblem);
    }
    catch(err){
        res.status(404).send(err);
    }
}

const getAllProblem=async(req,res)=>{

    try{
        const getProblem=await Problem.find({}).select('_id title difficulty');

        if(getProblem.length==0) 
            return res.status(404).send("Problem is Missing");

        res.status(200).send(getProblem);
    }
    catch(err){
        res.status(404).send(err);
    }
}

const problemSolvedByuser=async(req,res)=>{
    try{
        const userId=req.result._id;
        const user=await User.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        });
        // const count=req.result.problemSolved.length;
        res.status(200).send(user.problemSolved);

    }catch(err){
        res.status(500).send(err);
    }
}

const submittedProblem=async(req,res)=>{
    try{
        const userId=req.result._id;
        const problemId=req.params.pid;

        const ans=await Submission.find({userId,problemId});
        if(ans.length==0){
            res.status(200).send("No Submission is Present");
        }
        res.status(200).send(ans);
    }
    catch(err){
        res.status(500).send(err);
    }
}





module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,problemSolvedByuser,submittedProblem};