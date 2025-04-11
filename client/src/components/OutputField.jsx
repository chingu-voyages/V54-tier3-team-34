import React from "react";
import ReactMarkdown from "react-markdown"; // Markdown renderer (markdown -> HTML) for React
import rehypeSanitize from "rehype-sanitize"; // To sanitize the generated HMTL and avoid XSS vulnerabilities
import remarkGfm from "remark-gfm"; // Adds GFM (Github Flavored Markdown) support. Necessary for tables, strikethrough, tasklists and other suff to display correctly.

import "../markdown.css"; // [WIP] basic styling for the HTML generated from the AI's markdown response


export default function OutputField({ chatHistory, isLoading }) {
  if (isLoading) {
    return (
      <div className="font-paragraph font-normal markdown-content mx-1 mt-5 flex-1 p-3 tracking-wider text-white-text">
        Loading...
      </div>
    );
  }

  if (chatHistory.length > 0) {
    return (
      <div className="font-paragraph font-normal markdown-content mx-1 mt-5 flex-1 p-3 tracking-wider text-white-text">
        {chatHistory.map((entry, index) => (
          <div key={index} className={`mb-4 ${entry.role === "user" ? "text-primary-green" : "text-white-text"}`}>
            <strong>{entry.role === "user" ? "You:" : "AI:"}</strong>
      {/* // This is how we use ReactMarkdown with the plugins we need */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
      >
              {entry.text}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="font-paragraph markdown-content text-white-text mx-1 mt-5 flex-1 p-3 font-normal tracking-wider">
      <h2 className="text-center font-medium">Start prompting smarter.</h2>
      Welcome to <strong>Penta AI</strong>. Follow the Pentagram Framework to craft clear, effective prompts in just five steps.
    </div>
  );
}