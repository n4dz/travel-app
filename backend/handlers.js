import { Configuration, OpenAIAPi } from 'openai';
import readline from 'readline';


const dotenv = require('dotenv');
const request = require('request');

// Loading environment variables from a .env file
dotenv.config();

// // Endpoint to check the health of the service
// const getHealthCheck = async (req, res) => {
//     var healthy = { "healthy": true }
//     return res.status(200).send(healthy);
// };



const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async input => {
    const res = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
    });
        console.log(response.data.choices[0].message.content);
        userInterface.prompt();
})

const openai = new OpenAIAPi(new Configuration({    
    apiKey: process.env.OPENAI_API_KEY,
}));






// // Endpoint to retrieve TikTok social analytics using Ayrshare API
// const getChatGPT = async (req, res) => {
//     // Retrieving Ayrshare API key from environment variables
//     const apiKey = process.env.OPENAPI_KEY;

//     // Checking if Ayrshare API key is missing
//     if (!apiKey) {
//         console.error('OPENAPI_KEY not found in .env file');
//         return res.status(500).send('Internal Server Error');
//     }

//     // Configuring request options for TikTok analytics
//     // https://docs.ayrshare.com/rest-api/endpoints/analytics
//     var options = {
//         'method': 'GET',
//         'url': 'https://app.ayrshare.com/api/analytics/social',
//         'headers': {
//             'Authorization': 'Bearer ' + apiKey,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "platforms": [
//                 "tiktok"
//             ]
//         })
//     }
// };

// module.exports = {
//     getHealthCheck,
//     getChatGPT,
// };