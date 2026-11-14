const axios = require("axios");
require("dotenv").config();

const getLanguageById = (lang) => {
    const language = {
        "c++": 54,
        "java": 62,
        "javascript": 63,
        "python": 71,
    };

    return language[lang.toLowerCase()];
};

const submitBatch = async (submissions) => {
    const options = {
        method: 'POST',
        url: 'https://api.onlinecompiler.io/api/judge0/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'X-Auth-Token': process.env.ONLINECOMPILER_API_KEY,
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("submitBatch Error:", error.response?.data || error.message);
        throw error;
    }
};

const waiting = (timer) => new Promise((resolve) => setTimeout(resolve, timer));

const submitToken = async (resultToken) => {
    const options = {
        method: 'GET',
        url: 'https://api.onlinecompiler.io/api/judge0/submissions/batch',
        params: {
            tokens: resultToken.join(","),
            base64_encoded: 'false',
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
            console.error("submitToken Error:", error.response?.data || error.message);
            throw error;
        }
    }

    while (true) {
        const result = await fetchData();
        const isResultObtained = result.submissions.every((r) => r.status_id > 2);

        if (isResultObtained) {
            return result.submissions;
        }

        await waiting(1000);
    }
};

module.exports = { getLanguageById, submitBatch, submitToken };