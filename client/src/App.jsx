import { useEffect, useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import TextArea from "./components/TextArea";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";
import GenerateButton from "./components/GenerateButton";
import OutputField from "./components/OutputField";
import { steps } from "./steps";
import { generateWithGemini } from "./ai-model";

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
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      if (stepNumber === 4) {
        handleSubmit(e);
        return;
      }
      handleContinue();
    }
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

    const missingData = validateInput();
    if (Object.keys(missingData).length) {
      setErrorMessages(missingData);
      return;
    }

    // if all data is present, make api call
    setIsLoading(true);
    try {
      const response = await generateWithGemini(formData); // we can change this logic later to dinamicly select the AI model
      setAiResponse(response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("**Error:** Unable to fetch response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-green-background flex min-h-screen flex-col items-center gap-5">
      <Header />
      <div className="border-primary-green w-full max-w-[1000px] flex-1 md:w-3xl flex flex-col justify-end ">
        {/* if there is output */}
        {isLoading ? (
          <OutputField response={"Loading..."} />
        ) : aiResponse ? (
          <OutputField response={aiResponse} />
        ) : (
          <div className="font-paragraph markdown-content text-white-text mx-1 mt-5 flex-1 p-3 font-normal tracking-wider">
            <h2 className="text-center font-medium">
              {" "}
              Start prompting smarter.
            </h2>
            Welcome to <strong>Penta AI</strong>. Follow the Pentagram Framework
            to craft clear, effective prompts in just five steps.{" "}
          </div>
        )}
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
            <GenerateButton formData={formData} />
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
      {/* initial button */}
      {/* <button className="penta absolute right-1/2 bottom-5 h-28 w-28 translate-x-1/2 bg-green-500 text-lg font-bold opacity-50 drop-shadow-[3px_3px_0px_white] filter hover:drop-shadow-[1px_1px_0px_white] active:drop-shadow-[0px_0px_0px_white]">
        generate
      </button> */}
      {/* output already visible */}
      <footer className="bg-dark-backround hidden w-full translate-y-full text-center md:block -z-10">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
