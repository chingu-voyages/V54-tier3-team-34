import { useEffect, useState, useRef } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import TextArea from "./components/TextArea";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";
import GenerateButton from "./components/GenerateButton";
import OutputField from "./components/OutputField";
import { steps } from "./steps";
import { generateAnswer, getChatHistory } from "./services/ai-agent.js";

function App() {
  const [formData, setFormData] = useState({
    persona: "",
    context: "",
    task: "",
    output: "",
    constraint: "",
  });
  const [stepNumber, setStepNumber] = useState(0);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
        setChatHistory(
          history.flatMap((prompt) => [
            { role: "user", text: makeUserMessage(prompt) },
            { role: "ai", text: prompt.answer },
          ]),
        );
      })
      .catch((error) => {
        if (error.cause.responseStatus == 404) {
          window.history.replaceState(null, "", "/");
        }
      });
  }, []);

  // change currentStep everytime stepNumber changes
  useEffect(() => {
    setCurrentStep(steps[stepNumber]);
  }, [stepNumber]);

  // users submits item.  saved to state, moves to next input form
  const handleContinue = () => {
    setStepNumber((prev) => prev + 1);
  };

  // clear individual textArea
  const handleClear = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // update object on input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // click continue button when user hits enter key
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    if (stepNumber !== 4) {
      handleContinue();
      return;
    }

    handleSubmit(e);
  };

  // check each key and see if there is value, create error message. if all filled out, return empty string
  const validateInput = () => {
    setErrorMessages({});
    const missingData = {};
    // if step isn't filled out, create error object with key and error message
    Object.entries(formData).forEach(([key, value], index) => {
      if (!value) {
        missingData[key] =
          `Step ${index + 1}: ${key.slice(0, 1).toUpperCase() + key.slice(1)} is requried`;
      }
    });
    return missingData;
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    const missingData = validateInput();
    if (Object.keys(missingData).length) {
      setErrorMessages(missingData);
      return;
    }

    const userPrompt = makeUserMessage(formData);

    // Add the user's prompt to the chat history immediately
    setChatHistory((prev) => [...prev, { role: "user", text: userPrompt }]);

    // Add a "Loading..." placeholder to the chat history
    const loadingMessageIndex = chatHistory.length + 1;
    setChatHistory((prev) => [...prev, { role: "ai", text: "Loading..." }]);

    setIsLoading(true);
    try {
      const response = await generateAnswer(formData); // Fetch AI response

      // Replace the "Loading..." placeholder with the AI's response
      setChatHistory((prev) =>
        prev.map((entry, index) =>
          index === loadingMessageIndex
            ? { role: "ai", text: response }
            : entry,
        ),
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);

      // Replace the "Loading..." placeholder with an error message
      setChatHistory((prev) =>
        prev.map((entry, index) =>
          index === loadingMessageIndex
            ? { role: "ai", text: "**Error:** Unable to fetch response" }
            : entry,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-green-background flex min-h-screen flex-col items-center gap-5">
      <Header />
      <div className="border-primary-green flex w-full max-w-[1000px] flex-1 flex-col justify-end md:w-3xl">
        <OutputField chatHistory={chatHistory} isLoading={isLoading} />
        <div className="bg-dark-green-background sticky bottom-0 flex flex-col items-stretch gap-4 pb-2">
          <form onSubmit={handleSubmit} noValidate>
            <div
              className="bg-green-background-shade relative m-0 flex w-full flex-col rounded-xl border-none"
              // has-focus:outline-1 has-focus:outline-primary-green
            >
              <TextArea
                title={currentStep.name}
                description={currentStep.description}
                inputValue={formData[currentStep.name]}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
              />
              <div className="mb-6 flex w-full items-center justify-around gap-3">
                <Button
                  text="clear"
                  onClick={handleClear}
                  name={currentStep.name}
                />
                <Button
                  text="continue"
                  onClick={handleContinue}
                  name={currentStep.name}
                  disabled={stepNumber === 4}
                />
              </div>
            </div>
            <GenerateButton formData={formData} disabled={isLoading} />
          </form>
          <ProgressBar
            steps={steps}
            setStepNumber={setStepNumber}
            stepNumber={stepNumber}
            formData={formData}
            errorMessages={errorMessages}
          />
        </div>
      </div>

      {/* self-closing div to implement auto-scrolling  */}
      <div ref={scroller} />

      <footer className="bg-dark-backround -z-10 hidden w-full translate-y-full text-center md:block">
        <Footer />
      </footer>
    </div>
  );
}

export default App;

function makeUserMessage(prompt) {
  return `Persona: ${prompt.persona}, Context: ${prompt.context}, Task: ${prompt.task}, Output: ${prompt.output}, Constraint: ${prompt.constraint}`;
}
