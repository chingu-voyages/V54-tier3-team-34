import { useEffect, useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import TextArea from "./components/TextArea";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";
import { AiService } from "./components/AiService/AiService";
import OutputField from "./components/OutputField";
import { steps } from "./steps";
import { GoogleGenAI } from "@google/genai";


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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

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
    if (e.key === "Enter") {
      e.preventDefault();
      if (stepNumber === 4) return;
      handleContinue();
    }
  };

  // check each key and see if there is value, create error message. if all filled out, return empty string
  const validateInput = () => {
    setErrorMessages({})
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // run validation function.  if error string is returned, set errorMessage and stop and return
    const missingData = validateInput();

    // if there are any error messags in object, add them to state
    if (Object.keys(missingData).length) {
      setErrorMessages(missingData);
      return;
    }
    // if no errors - proceed to communicate with API
    console.log("Submitted success - communicate with API HERE");
  };

  const geminiApiHandler = async (formData) => {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Generate a response for the following prompt built using the Pentagram Framework for prompt engineering: Persona:{${formData.persona}}, Context:{${formData.context}}, Task:{${formData.task}}, Output:{${formData.output}}, Constraint:{${formData.constraint}}.`,
    });
    return response.text;
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 bg-black">
      <Header />
      <div className="w-full max-w-[1000px] flex-1 border-green-500">
        <div className="min-h-24 bg-green-500 p-3 m-2">
          {currentStep.description
            .split(" ")
            .map((word, i) =>
              word === currentStep.name ? (
                <strong key={i}>{word} </strong>
              ) : (
                word + " "
              ),
            )}
        </div>
        {isSubmitted && (
        <AiService
          apiHandler={geminiApiHandler}
          formData={formData}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          setResponse={setAiResponse}
        />
      )}
      {aiResponse && <OutputField response={aiResponse} />}
        <div className="relative mx-1 mt-5 p-1">
          <TextArea
            title={currentStep.name}
            placeholder={currentStep.example}
            inputValue={formData[currentStep.name]}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
          />
          <div className="absolute bottom-5 flex w-full items-center justify-around gap-3">
            <Button text="clear" onClick={handleClear} name={currentStep.name} />
            <Button
              text="continue"
              onClick={handleContinue}
              name={currentStep.name}
              disabled={stepNumber === 4}
            />
          </div>
        </div>

        <ProgressBar
          steps={steps}
          setStepNumber={setStepNumber}
          stepNumber={stepNumber}
          formData={formData}
          errorMessages={errorMessages}
        />
      </div>
      {/* initial button */}
      {/* <button className="penta absolute right-1/2 bottom-5 h-28 w-28 translate-x-1/2 bg-green-500 text-lg font-bold opacity-50 drop-shadow-[3px_3px_0px_white] filter hover:drop-shadow-[1px_1px_0px_white] active:drop-shadow-[0px_0px_0px_white]">
        generate
      </button> */}
      {/* output already visible */}
      <div
        className="fixed right-3 bottom-3 z-100 flex cursor-pointer items-center justify-center hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        onClick={handleSubmit}
      >
        <div className="absolute z-10 text-xs leading-[10px] text-white">
          <div>gen</div>
          <div>er</div>ate
        </div>
        <div className="penta animate-rotate absolute h-13 w-13 bg-black"></div>
        <button className="penta animate-rotate relative h-12 w-12 bg-green-500"></button>
      </div>

      <footer className="hidden w-full translate-y-full bg-black text-center md:block">
        <Footer />
      </footer>
    </div>
  );
}

export default App;