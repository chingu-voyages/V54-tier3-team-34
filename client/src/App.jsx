import { useEffect, useState, useRef } from "react";

import AppExplanation from "./components/AppExplanation";
import Header from "./components/Header";
import OutputField from "./components/OutputField";
import Form from "./components/Form";
import Footer from "./components/Footer";
import { getConversation, deletePrompt } from "./services/ai-agent.js";

export default function App() {
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [conversationHash, setConversationHash] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const scroller = useRef(null);

  useEffect(() => {
    scroller.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });

  useEffect(() => {
    const hash = window.location.pathname.slice(1);
    if (!hash) {
      return;
    }

    getConversation({ hash })
      .then(({ hash, history }) => {
        setConversationHash(hash);
        setChatHistory(history);
      })
      .catch((error) => {
        if (error.cause.responseStatus == 404) {
          window.history.replaceState(null, "", "/");
        }
      });
  }, []);

  async function deleteOutput({ promptId }) {
    try {
      await deletePrompt({ conversationHash, promptId });

      setChatHistory((prev) => prev.filter((prompt) => prompt.id !== promptId));
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
  }

  return (
    <div className="bg-dark-green-background flex min-h-screen flex-col items-center gap-5">
      {explanationOpen && (
        <AppExplanation setExplanationOpen={setExplanationOpen} />
      )}

      <Header setExplanationOpen={setExplanationOpen} />

      <div className="border-primary-green flex w-full max-w-[1000px] flex-1 flex-col justify-end md:w-3xl">
        <OutputField chatHistory={chatHistory} deleteOutput={deleteOutput} />
        <Form
          conversationHash={conversationHash}
          setConversationHash={setConversationHash}
          setChatHistory={setChatHistory}
        />
        {/* self-closing div to implement auto-scrolling  */}
        <div ref={scroller} />
      </div>

      <footer className="bg-dark-backround -z-10 hidden w-full translate-y-full text-center md:block">
        <Footer />
      </footer>
    </div>
  );
}
