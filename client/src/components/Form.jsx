import { useState, useEffect } from "react";

import Button from "./Button";
import GenerateButton from "./GenerateButton";
import ProgressBar from "./ProgressBar";
import TextArea from "./TextArea";
import { steps } from "../steps";
import { addPrompt, createConversation } from "../services/ai-agent.js";

export default function Form({
  conversationHash,
  setConversationHash,
  setChatHistory,
}) {
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

    setChatHistory((prev) => [
      ...prev,
      {
        id: Math.floor(Math.random() * 1000),
        persona: formData.persona,
        context: formData.context,
        task: formData.task,
        format: formData.output,
        constraint: formData.constraint,
        answer: "Loading...",
      },
    ]);

    setIsLoading(true);
    try {
      if (!conversationHash) {
        // create a new conversation
        const conversation = await createConversation(formData);
        window.history.pushState(null, "", conversation.hash);

        setConversationHash(conversation.hash);
        setChatHistory(conversation.history);
        return;
      }

      // otherwise add the prompt to the conversation
      const prompt = await addPrompt({ conversationHash, ...formData });
      // replace the client prompt we added with the server's
      setChatHistory((prev) => [...prev.slice(0, prev.length - 1), prompt]);
    } catch (error) {
      console.error("Error fetching AI response:", error);

      setChatHistory((prev) =>
        prev.map((prompt, index) => {
          if (index === prev.length - 1) {
            return { ...prompt, answer: "**Error:** Unable to fetch response" };
          }

          return prompt;
        }),
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
  );
}
