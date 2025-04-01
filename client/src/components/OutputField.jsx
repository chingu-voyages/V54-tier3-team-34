import React from "react";
import ReactMarkdown from "react-markdown"; // Markdown renderer (markdown -> HTML) for React
import rehypeSanitize from "rehype-sanitize"; // To sanitize the generated HMTL and avoid XSS vulnerabilities
import remarkGfm from "remark-gfm"; // Adds GFM (Github Flavored Markdown) support. Necessary for tables, strikethrough, tasklists and other suff to display correctly. 

import "../markdown.css"; // [WIP] basic styling for the HTML generated from the AI's markdown response


export default function OutputField({ response }) {
  return (
    <div className="markdown-content mx-1 mt-5 flex-1 border border-white bg-green-500/20 p-3 text-sm tracking-wider text-amber-50">
      {/* // This is how we use ReactMarkdown with the plugins we need */}
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}> 
        {response}
      </ReactMarkdown> 
    </div>
  );
}