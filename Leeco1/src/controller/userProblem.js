const { getLanguageById, submitBatch, submitToken } = require("../utils/Problemutility");
const Problem = require("../models/problem");

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

module.exports = createProblem;