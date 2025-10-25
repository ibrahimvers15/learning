
import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = ai.models;

export const generateLessonContent = async (subject: string, chapter: string, grade: number): Promise<string> => {
    const prompt = `Generate a simple and easy-to-understand lesson for a grade ${grade} student on the topic of "${chapter}" in the subject of ${subject}. Use simple language, short sentences, and examples they can relate to. The lesson should be about 200-300 words long. Do not use markdown, just plain text with newlines to separate paragraphs.`;

    try {
        const response = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating lesson content:", error);
        return "Sorry, I couldn't create a lesson right now. Please try again later.";
    }
};

export const generateQuiz = async (subject: string, chapter: string, grade: number): Promise<QuizQuestion[]> => {
    const prompt = `Create a simple 5-question multiple-choice quiz for a grade ${grade} student on the topic of "${chapter}" in the subject of ${subject}. For each question, provide 4 options and indicate the correct answer.`;

    try {
        const response = await model.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                            options: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            },
                            correctAnswer: { type: Type.STRING }
                        },
                        required: ["question", "options", "correctAnswer"]
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating quiz:", error);
        return [];
    }
};
