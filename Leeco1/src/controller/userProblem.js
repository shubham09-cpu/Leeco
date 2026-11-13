const getLanguageById=require("../utils/Problemutility");

const createProblem = async(req,res)=>{

    const {title,description,difficulty,tags,visibleTestCases,
        hiddenTestCases,startCode,referenceSolution
        ,problemCreator}=req.body;

    try{

        for(const {language,completeCode} of referenceSolution){

            const languageId=getLanguageById(language);

            const submission=visibleTestCases.map((input,ouptput)=>({
                source_code:completeCode,
                language_id:language,
                stdin:input,
                expected_ouput:ouptut
            }));

            const submitResult=await submmitBatch(submissions);
        }


    }
    catch(err){

    }
}