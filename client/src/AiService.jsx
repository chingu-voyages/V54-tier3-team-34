import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export function AiService() {
  const [userPrompt, setUserPrompt] = useState("");
  const [geminiOut, setGeminiOut] = useState("");

  function handle(e) {
    e.preventDefault();
    // Get the input value from the form
    const inputValue = e.target.elements.userInput.value;
    setUserPrompt(inputValue);
  }

  useEffect(() => {
    async function fetchGeminiResponse() {
      if (!userPrompt) return; // Prevent empty API calls

      try {
        const ai = new GoogleGenAI({
          apiKey: import.meta.env.VITE_GEMINI_API_KEY,
        });
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash", 
          contents: userPrompt,
        });
        setGeminiOut(response.text);
      } catch (error) {
        console.error("Error fetching Gemini response:", error);
        setGeminiOut("Error fetching response");
      }
    }

    fetchGeminiResponse();
  }, [userPrompt]);

  return (
    <>
      <form onSubmit={handle}>
        <input 
          type="text" 
          name="userInput" // Add name attribute
          className="text-white bg-amber-900"
        />
        <button type="submit" className="text-white">submit</button>
      </form>
      <p className="font-tektur text-sm text-green-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        Out: {geminiOut}
      </p>
    </>
  );
}