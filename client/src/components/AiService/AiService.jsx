import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown"; // Markdown renderer (markdown -> HTML) for React
import rehypeSanitize from "rehype-sanitize"; // To sanitize the generated HMTL and avoid XSS vulnerabilities
import remarkGfm from "remark-gfm"; // Adds GFM (Github Flavored Markdown) support. Necessary for tables, strikethrough, tasklists and other suff to display correctly. 

import "./markdown.css"; // [WIP] basic styling for the HTML generated from the AI's markdown response

export function AiService({ formData, isSubmitted, setIsSubmitted }) {
  const [geminiOut, setGeminiOut] = useState("");

  const generatePromptFromFormData = (formData) => {
    return `Generate a response for the following prompt built using the Pentagram Framework for prompt engineering: Persona:{${formData.persona}}, Context:{${formData.context}}, Task:{${formData.task}}, Output:{${formData.output}}, Constraint:{${formData.constraint}}.`
  };

  useEffect(() => {
    async function fetchGeminiResponse() {
      if (!isSubmitted) return;
      try {
        const ai = new GoogleGenAI({
          apiKey: import.meta.env.VITE_GEMINI_API_KEY,
        });
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: generatePromptFromFormData(formData),
        });
        setGeminiOut(response.text);
      } catch (error) {
        console.error("Error fetching Gemini response:", error);
        setGeminiOut("**Error:** Unable to fetch response");
      } finally {
        setIsSubmitted(false);
      }
    }
    fetchGeminiResponse();
  }, [isSubmitted, formData, setIsSubmitted]);

  return (
    <>
      <div className="font-tektur text-sm text-green-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        <div className="ai-response markdown-content">
          <h1>Response: </h1>
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