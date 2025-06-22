import { OpenAI } from 'openai'
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const suggestionClause = async (req, res) => {
    try {
        const { promptTemplate, context } = req.body;

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

export default suggestionClause;