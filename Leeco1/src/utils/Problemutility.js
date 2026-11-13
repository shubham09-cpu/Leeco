const axios=require("axios")
const getLanguageById=(lang)=>{

    const language={
        "c++":54,
        "java":62,
        "javascript":63
    }

    return language[lang.toLowerCase()];
}

const submmitBatch=(submissions)=>{

    
}
module.exports={getLanguageById,submmitBatch};
