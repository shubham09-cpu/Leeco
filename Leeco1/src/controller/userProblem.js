const getLanguageById=require("../utils/Problemutility");

const createProblem = async(req,res)=>{

    const {title,description,difficulty,tags,visibleTestCases,
        hiddenTestCases,startCode,referenceSolution
        ,problemCreator}=req.body;

    try{

        for(const {language,completeCode} of referenceSolution){

            const languageId=getLanguageById(language);

            

        }

    }
    catch(err){

    }
}