import { GoogleGenAI } from "@google/genai";

export default { answerWithGemini };

function answerWithGemini({ constraint, context, format, persona, task }) {
  const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt =
    "Complete the following task as described below: \n{\n" +
    `  constraint: ${constraint}\n` +
    `  context: ${context}\n` +
    `  format: ${format}\n` +
    `  persona: ${persona}\n` +
    `  task: ${task}\n` +
    `}`;

  return gemini.models
    .generateContent({ model: "gemini-2.0-flash", contents: prompt })
    .then((response) => response.text);
}
