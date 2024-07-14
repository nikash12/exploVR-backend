import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config();
const port = process.env.PORT || 2001;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const generationConfig = {
    stopSequences: ["\n\n"], 
    maxOutputTokens: 200,
    temperature: 1,
    topP: 0.9,
    topK: 40,
};

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, generationConfig);

// Initialize a history log
let history = [];

async function run(prompt = "") {
    try {
        
        const historyContext = history.join('\n') + '\n' + prompt;
        const result = await model.generateContent(historyContext);
        const response = result.response;
        const text = response.text()
        history.push(prompt);
        history.push(text);

        if (history.length > 20) {
            history = history.slice(-20);
        }

        return text;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.post("/api", async (req, res) => {
    const { text } = req.body;
    try {
        const data = await run(text);
        res.json({ generatedText: data }); 
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Failed to generate content' }); 
    }
});
