import { useState, useEffect } from "react"

import Button from "./Button"
import GenerateButton from "./GenerateButton"
import ProgressBar from "./ProgressBar"
import TextArea from "./TextArea"
import { steps } from "../steps";
import { generateAnswer } from "../services/ai-agent.js";


export default function Form({ chatHistory, setChatHistory, makeUserMessage }) {
  const [formData, setFormData] = useState({
    persona: "",
    context: "",
    task: "",
    output: "",
    constraint: "",
  });
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [stepNumber, setStepNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});


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
      const { hash, answer } = await generateAnswer(formData); // Fetch AI response

      // update the url
      window.history.pushState(null, '', hash);

      // Replace the "Loading..." placeholder with the AI's response
      setChatHistory((prev) =>
        prev.map((entry, index) =>
          index === loadingMessageIndex
            ? { role: "ai", text: answer }
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
  )
}
