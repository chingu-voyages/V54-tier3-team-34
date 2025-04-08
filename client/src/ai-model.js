import { GoogleGenAI } from "@google/genai";

export async function generateWithGemini(formData) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate a response for the following prompt built using the Pentagram Framework for prompt engineering: Persona:{${formData.persona}}, Context:{${formData.context}}, Task:{${formData.task}}, Output:{${formData.output}}, Constraint:{${formData.constraint}}.`,
  });

  return response.text;
}
