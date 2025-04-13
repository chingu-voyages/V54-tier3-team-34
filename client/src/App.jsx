import { useEffect, useState, useRef } from "react";
import AppExplanation from "./components/AppExplanation";
import Header from "./components/Header";
import OutputField from "./components/OutputField";
import Form from './components/Form'
import Footer from "./components/Footer";
import { getChatHistory } from "./services/ai-agent.js";

export default function App() {
  const [explanationOpen, setExplanationOpen] = useState(false);
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

    getChatHistory({ hash })
      .then(({ history }) => {
        setChatHistory((prev) => [
          ...prev,
          ...history.flatMap((prompt) => [
            { role: "user", text: makeUserMessage(prompt) },
            { role: "ai", text: prompt.answer },
          ]),
        ]);
      })
      .catch((error) => {
        if (error.cause.responseStatus == 404) {
          window.history.replaceState(null, "", "/");
        }
      });
  }, []);

  return (
    <div className="bg-dark-green-background flex min-h-screen flex-col items-center gap-5">
      {explanationOpen && (
        <AppExplanation setExplanationOpen={setExplanationOpen} />
      )}
      <Header setExplanationOpen={setExplanationOpen}/>
     
      <div className="border-primary-green flex w-full max-w-[1000px] flex-1 flex-col justify-end md:w-3xl">
        <OutputField chatHistory={chatHistory} />
        <Form chatHistory={chatHistory} setChatHistory={setChatHistory} makeUserMessage={makeUserMessage} />
        {/* self-closing div to implement auto-scrolling  */}
        <div ref={scroller} />
      </div>
 
      <footer className="bg-dark-backround -z-10 hidden w-full translate-y-full text-center md:block">
        <Footer />
      </footer>
    </div>
  );
}

function makeUserMessage(prompt) {
  return `Persona: ${prompt.persona}, Context: ${prompt.context}, Task: ${prompt.task}, Output: ${prompt.format}, Constraint: ${prompt.constraint}`;
}
