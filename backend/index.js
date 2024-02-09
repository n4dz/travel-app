const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const OpenAI = require('openai');

require('dotenv').config();
const PORT = process.env.PORT || 8080;

const openai = new OpenAI.OpenAI({apiKey:process.env.OPENAPI_KEY});

express()
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header(
            "Access-Control-Allow-Methods",
            "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        next();
    })
    .use(morgan("tiny"))
    .use(express.static("./client/build"))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))

    // Endpoints here
    .get("/health", (req, res) => {
        res.status(200).send({ status: "healthy" });  
    })

    .post("/travel/suggestions", async (req, res) => {
        const { firstName, lastName, email, country, price, currency, startDate, endDate } = req.body;
        if (!firstName || !lastName || !email || !country || !price || !currency || !startDate || !endDate) {
            return res.status(400).send({ message: "Please fill out all fields" });
        }

        messageToOpenAI = `Hi, my name is ${firstName} ${lastName}! I need help planning a trip. I am leaving from ${country} the ${startDate} to ${endDate} and I'm looking for a single popular suggestion. I'm on a tight budget of ${price} ${currency} including the flight to go and to return. I can't pay more. What is the best place to visit? Can you provide me a complete itinerary respecting the maximum budget of ${price} ${currency}?`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: messageToOpenAI }],
            model: "gpt-3.5-turbo",
        });

        res.status(200).send({ message: completion.choices[0].message.content });
    })

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));

