import { OpenAI } from 'openai'
import dotenv from 'dotenv'
import promptTemplate from './prompts/promptTemplate.js';
import chatTemplate from './prompts/chatTemplate.js';
import documentModel from "../models/aiDocument.model.js"
import chatModel from "../models/aichat.model.js"

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const suggestionClause = async (req, res) => {

    try {
        const { context } = req.body;

        await documentModel.create({ prompt: req.body });

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
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

    await chatModel.create({ prompt: messages.map(m => m.content).join("\n") });
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
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