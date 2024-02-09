const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI.OpenAI({apiKey:process.env.OPENAPI_KEY});

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}

main();