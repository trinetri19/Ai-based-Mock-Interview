import { GoogleGenAI } from "@google/genai";

export const generate = async (req, res) => {
    const { role, level } = req.body;

    const ai = new GoogleGenAI({});

    try {
        const response = await ai.models.generateContent({

            model: "gemini-3-flash-preview",

            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `Act as a professional interviewer. Generate 5 ${level} level ${role} interview questions. Return only JSON array.`
                        }
                    ]
                }
            ]
        });


        const text = response.text;

        res.json({ result: text });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).send(`Error generating questions ${err}`);
    }


};



export const evaluate = async (req, res) => {
    const { question, answer } = req.body;
    const ai = new GoogleGenAI({});
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",

            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
Question: ${question}
Answer: ${answer}

Evaluate the answer and provide:
- Score (out of 10)
- Strengths
- Improvements
`
                        }
                    ]
                }
            ]
        });

        // ✅ Safe extraction
        const feedback =
            response?.text ||
            response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No feedback generated";

        res.json({ feedback });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({ error: "Error evaluating answer" });
    }

};