import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown"; // Markdown renderer (markdown -> HTML) for React
import rehypeSanitize from "rehype-sanitize"; // To sanitize the generated HMTL and avoid XSS vulnerabilities
import remarkGfm from "remark-gfm"; // Adds GFM (Github Flavored Markdown) support. Necessary for tables, strikethrough, tasklists and other suff to display correctly. 

import prompt from "./mocks/userInputData.js"; // Simulating the inputs from the user

import "./markdown.css"; // [WIP] basic styling for the HTML generated from the AI's markdown response

export function AiService() {
  const [userPrompt, setUserPrompt] = useState(prompt);
  const [geminiOut, setGeminiOut] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = e.target.elements.userInput.value;
    setUserPrompt(inputValue);
  }

  useEffect(() => {
    async function fetchGeminiResponse() {
      if (!userPrompt) return;

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
        setGeminiOut("**Error:** Unable to fetch response");
      }
    }
    fetchGeminiResponse();
  }, [userPrompt]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userInput"
          className="text-green-500 bg-stone-900"
        />
        <button type="submit" className="bg-green-500 text-white">submit</button>
      </form>
      <div className="font-tektur text-sm text-green-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        Out:
        <div className="ai-response markdown-content">
          <ReactMarkdown // This is how we use ReactMarkdown with the plugins we need
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {geminiOut}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}