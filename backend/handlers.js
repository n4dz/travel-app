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


// module.exports = {
//     getHealthCheck,
//     getChatGPT,
// };
