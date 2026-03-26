import OpenAI from 'openai'
import dotenv from 'dotenv'
import promptTemplate from './prompts/promptTemplate.js';
import chatTemplate from './prompts/chatTemplate.js';
import documentModel from "../models/aiDocument.model.js"
import chatModel from "../models/aichat.model.js"

dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_APP_NAME || "LawSetu"
    }
})

const suggestionClause = async (req, res) => {

    try {
        const { context } = req.body;

        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({
                error: "Missing API key"
            });
        }

        await documentModel.create({ prompt: context });

        const completion = await openai.chat.completions.create({
            model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
            messages: [
                { role: 'system', content: promptTemplate },
                { role: 'user', content: context },
            ]
        })

        const suggestion = completion.choices[0].message.content.trim();
        res.status(200).json({ text: suggestion });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'AI suggestion failed'
        });
    }
}

const chat = async (req, res) => {

    const { messages } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
        return res.status(500).json({
            error: "Missing API key"
        });
    }

    await chatModel.create({ prompt: messages.map(m => m.content).join("\n") });
    try {
        const completion = await openai.chat.completions.create({
            model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
            messages: [
                { role: "system", content: chatTemplate },
                ...messages
            ]
        })

        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Failed to get response"
        })
    }

}

export { suggestionClause, chat };