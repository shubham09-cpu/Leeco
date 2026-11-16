const Problem = require("../models/problem");
const Submission = require("../models/submission")
const getLanguageById = require("../utils/Problemutility");

const submitCode = async (req, res) => {

    try {
        const userId = req.result._id;
        const problemId = req.params.id;

        const { code, language } = req.body;

        if (!userId || !code || !problemId || !language)
            return res.status(400).send("Some Field Missing");

        const problem = await Problem.findById(problemId);

        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesPassed,
            status: 'pending',
            testCasesTotal: problem.hiddenTestCases.length
        })

        const languageId = getLanguageById(language);

        const submissions = problem.hiddenTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output,
        }));

        const submitResult = await submitBatch(submissions);
        const resultToken = submitResult.map((value) => value.token);
        const testResult = await submitToken(resultToken);

        let testCasesPassed=0;
        let runtime=0;
        let memory=0;
        let status="accepted";
        let errorMessage=null;

        for(const test of testResult){
            if(test.status_id==3)
            {
                testCasesPassed++;
                runtime=runtime+parseFloat(test.time);
                memory=Math.max(memory,test.memory);
            }else{
                if(test.status_id==4){
                    status='error';
                    errorMessage=test.stderr
                }
                else{
                    errorMessage=test.stderr
                    status="wrong"
                }
            }
        }

        submittedResult.status=status;
        submittedResult.testCasesPassed=testCasesPassed;
        submittedResult.errorMessage=errorMessage;
        submittedResult.runtime=runtime;

        await submittedResult.save();
        res.status(201).send(submittedResult);

    }
    catch (err) {
        res.status(500).send(err);
    }
}

module.exports = submitCode;