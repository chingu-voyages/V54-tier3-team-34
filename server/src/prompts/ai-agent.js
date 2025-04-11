import { GoogleGenAI } from "@google/genai";

export default { chatWithGemini };

export async function chatWithGemini({ history = [], promptData }) {
  const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const geminiFormattedHistory = history.flatMap(({ answer, ...rest }) => [
    { role: "user", parts: [{ text: getPromptText(rest) }] },
    { role: "model", parts: [{ text: answer }] },
  ]);

  const chat = gemini.chats.create({
    model: "gemini-2.0-flash",
    history: geminiFormattedHistory,
  });

  return chat
    .sendMessage({ message: getPromptText(promptData) })
    .then((response) => response.text)
    .catch((error) => {
      throw new error("error while generating a gemini answer!", {
        cause: error,
      });
    });
}

function getPromptText({ constraint, context, format, persona, task }) {
  return (
    "Complete the following task as described below: \n{\n" +
    `  constraint: ${constraint}\n` +
    `  context: ${context}\n` +
    `  format: ${format}\n` +
    `  persona: ${persona}\n` +
    `  task: ${task}\n` +
    `}`
  );
}
