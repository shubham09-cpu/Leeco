const getLanguageById=require("../utils/Problemutility");

const createProblem = async(req,res)=>{

    const {title,description,difficulty,tags,visibleTestCases,
        hiddenTestCases,startCode,referenceSolution
        ,problemCreator}=req.body;

    try{

        for(const {language,completeCode} of referenceSolution){

            const languageId=getLanguageById(language);

            const submission=visibleTestCases.map((testcases)=>({
                source_code:completeCode,
                language_id:language,
                stdin:testcases.input,
                expected_ouput:testcases.ouptut
            }));

            const submitResult=await submmitBatch(submissions);

            const resultToken =submitResult.map((value)=>value.token);

            const testResult=await submitToken(resultToken);
        }


    }
    catch(err){

    }
}