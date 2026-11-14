const axios = require("axios");
require("dotenv").config();

const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    "java": 62,
    "javascript": 63,
    "python": 71, // Added Python as well
  };

  return language[lang.toLowerCase()];
};

// Fixed spelling: submitBatch
// Uses OnlineCompiler's Judge0-compatible endpoint with wait=true (no polling needed!)
const submitBatch = async (submissions) => {


  const options = {
    method: 'POST',
    url: 'https://api.onlinecompiler.io/api/judge0/submissions/batch',
    params: {
      base64_encoded: 'true'
    },
    headers: {
      'X-Auth-Token': process.env.ONLINECOMPILER_API_KEY,
      'Content-Type': 'application/json'
    },
    data: {
      submissions
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return await fetchData();
};

const submitToken = async (resultToken) => {
  const options = {
    method: 'GET',
    url: 'https://api.onlinecompiler.io/api/judge0/submissions/batch',
    params: {
      tokens: resultToken.join(","),
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'X-Auth-Token': process.env.ONLINECOMPILER_API_KEY
    }
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
const result=await fetchData();

}



module.exports = { getLanguageById, submitBatch ,submitToken};
