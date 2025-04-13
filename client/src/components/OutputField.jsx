import React from "react";
import ReactMarkdown from "react-markdown"; // Markdown renderer (markdown -> HTML) for React
import rehypeSanitize from "rehype-sanitize"; // To sanitize the generated HMTL and avoid XSS vulnerabilities
import remarkGfm from "remark-gfm"; // Adds GFM (Github Flavored Markdown) support. Necessary for tables, strikethrough, tasklists and other suff to display correctly.

import "../markdown.css"; // [WIP] basic styling for the HTML generated from the AI's markdown response


export default function OutputField({ chatHistory }) {
  return (
    <div
    className="flex flex-col font-paragraph font-normal markdown-content mt-5 flex-1 p-3 tracking-wider text-white-text">
      {chatHistory.length > 0 ? (
        chatHistory.map((entry, index) => (
          <div key={index} className={`flex flex-col rounded-2xl  py-5 px-8 max-w-9/10  mb-4   ${entry.role === "user" ? "bg-baloon-user  self-end text-dark-green-background " : "bg-baloon-ai  self-start text-white-text"} ${entry.role}`}>
            {/* <strong>{entry.role === "user" ? "You:" : "AI:"}</strong> */}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
              {entry.text}
            </ReactMarkdown>
          </div>
        ))
      ) : (
        <div>
          <h2 className="text-center font-medium">Start prompting smarter.</h2>
          Welcome to <strong>Penta AI</strong>. Follow the Pentagram Framework to craft clear, effective prompts in just five steps.
        </div>
      )}
    </div>
  );
}