const Problem = require("../models/problem");
const Submission = require("../models/submission");
const { getLanguageById, submitBatch, submitToken } = require("../utils/Problemutility");

const submitCode = async (req, res) => {
    try {
        const userId = req.result._id;
        const problemId = req.params.id;
        const { code, language } = req.body;

        if (!userId || !code || !problemId || !language) {
            return res.status(400).send("Some Field Missing");
        }

        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).send("Problem not found");
        }

        const languageId = getLanguageById(language);
        if (!languageId) {
            return res.status(400).send(`Unsupported language: ${language}`);
        }

        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesPassed: 0,
            status: 'pending',
            testCasesTotal: problem.hiddenTestCases.length
        });

        const submissions = problem.hiddenTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output,
        }));

        const submitResult = await submitBatch(submissions);
        const resultToken = submitResult.map((value) => value.token);
        const testResult = await submitToken(resultToken);

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = "accepted";
        let errorMessage = null;

        for (const test of testResult) {
            if (test.status_id == 3) {
                testCasesPassed++;
                runtime += parseFloat(test.time || 0);
                memory = Math.max(memory, test.memory || 0);
            } else {
                errorMessage = test.stderr || test.compile_output || test.status?.description;
                if (test.status_id == 4) {
                    status = 'wrong'; // Judge0 status_id 4 is Wrong Answer
                } else {
                    status = 'error'; // Status IDs 5+ are TLE, Compilation Error, Runtime Error
                }
            }
        }

        submittedResult.status = status;
        submittedResult.testCasesPassed = testCasesPassed;
        submittedResult.errorMessage = errorMessage;
        submittedResult.runtime = runtime;
        submittedResult.memory = memory;

        await submittedResult.save();
        res.status(201).send(submittedResult);
    } catch (err) {
        res.status(500).send("Internal Server Error: " + err.message);
    }
};

module.exports = { submitCode };