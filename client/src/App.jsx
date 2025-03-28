import { useEffect, useState } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import OutputField from "./components/OutputField";
import TextArea from "./components/TextArea";
import Footer from "./components/Footer";
import { steps } from "./steps";
import ProgressBar from "./ProgressBar";

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

  // change currentStep everytime stepNumber changes
  useEffect(() => {
    setCurrentStep(steps[stepNumber]);
  }, [stepNumber]);

  // users submits item.  saved to state, moves to next input form
  const handleContinue = () => {
    setStepNumber((prev) => (prev += 1));
  };

  // clear individual textArea
  const handleClear = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // update object on input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle submit form
  const handleSubmit = () => {
    console.log(formData)
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-5 bg-black">
      <Header />
      <div className="w-full max-w-[1000px] flex-1 border-green-500">
        <div className="min-h-24 bg-green-500 p-3">
          {currentStep.description}
        </div>
        {/* if there is output */}
        {/* <OutputField /> */}
        <div className="relative mx-1 mt-5 p-1">
          <TextArea
            title={currentStep.name}
            placeholder={currentStep.example}
            inputValue={formData[currentStep.name]}
            handleChange={handleChange}
          />

          <div className="absolute bottom-5 flex w-full items-center justify-around gap-3">
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

        <ProgressBar
          steps={steps}
          setStepNumber={setStepNumber}
          stepNumber={stepNumber}
        />
      </div>
      {/* initial button */}
      {/* <button className="penta absolute right-1/2 bottom-5 h-28 w-28 translate-x-1/2 bg-green-500 text-lg font-bold opacity-50 drop-shadow-[3px_3px_0px_white] filter hover:drop-shadow-[1px_1px_0px_white] active:drop-shadow-[0px_0px_0px_white]">
        generate
      </button> */}
      {/* output already visible */}
      <div className="fixed right-3 bottom-3 z-100 flex items-center justify-center" onClick={handleSubmit}>
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
