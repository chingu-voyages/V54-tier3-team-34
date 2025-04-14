import { useState } from "react";
import ReactMarkdown from "react-markdown"; // Markdown renderer (markdown -> HTML) for React
import rehypeSanitize from "rehype-sanitize"; // To sanitize the generated HMTL and avoid XSS vulnerabilities
import remarkGfm from "remark-gfm"; // Adds GFM (Github Flavored Markdown) support. Necessary for tables, strikethrough, tasklists and other suff to display correctly.

import "../markdown.css"; // [WIP] basic styling for the HTML generated from the AI's markdown response

export default function OutputField({ chatHistory, deleteOutput }) {
  return (
    <div className="font-paragraph markdown-content text-white-text mt-5 flex flex-1 flex-col p-3 font-normal tracking-wider">
      {chatHistory.length > 0 ? (
        chatHistory.map((prompt) => (
          <OutputItem
            key={prompt.id}
            prompt={prompt}
            deleteOutput={deleteOutput}
          />
        ))
      ) : (
        <div>
          <h2 className="text-center font-medium">Start prompting smarter.</h2>
          Welcome to <strong>Penta AI</strong>. Follow the Pentagram Framework
          to craft clear, effective prompts in just five steps.
        </div>
      )}
    </div>
  );
}

function OutputItem({ prompt, deleteOutput }) {
  const [isLoading, setLoading] = useState(false);

  async function handleDeleteOutput() {
    setLoading(true);
    await deleteOutput({ promptId: prompt.id });
    setLoading(false);
  }

  return (
    <>
      <div className="relative user bg-baloon-user text-dark-green-background mb-4 flex max-w-9/10 flex-col self-end rounded-2xl px-8 py-5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {makeUserMessage(prompt)}
        </ReactMarkdown>
        <button
          onClick={handleDeleteOutput}
          disabled={isLoading}
          className="leading-0 absolute top-0 left-0 -translate-2/5 transition-all duration-150 hover:scale-120 bg-baloon-user hover:bg-white w-[40px] h-[40px] rounded-full cursor-pointer self-start"
        >
          <span className="material-symbols-outlined hover:scale-110 duration-100">delete</span>
        </button>
      </div>
      <div className="ai bg-baloon-ai text-white-text mb-4 flex max-w-9/10 flex-col self-start rounded-2xl px-8 py-5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
        >
          {prompt.answer}
        </ReactMarkdown>
      </div>
    </>
  );
}

function makeUserMessage(prompt) {
  return `Persona: ${prompt.persona}, Context: ${prompt.context}, Task: ${prompt.task}, Output: ${prompt.format}, Constraint: ${prompt.constraint}`;
}
