import React from "react";

export default function ProgressBar({
  steps,
  stepNumber,
  setStepNumber,
  formData,
  errorMessages,
}) {
  // move steps back
  const handleBack = () => {
    if (stepNumber === 0) return;
    setStepNumber((prev) => (prev -= 1));
  };

  // move steps forward
  const handleForward = () => {
    if (stepNumber === 4) return;
    setStepNumber((prev) => (prev += 1));
  };

  // handle click to move directly to step
  const handleClick = (number) => {
    setStepNumber(number);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-primary-green flex w-full items-center justify-center gap-5 text-5xl">
        <span
          className={`hover:text-white-text cursor-pointer text-4xl ${!stepNumber && "invisible"}`}
          onClick={handleBack}
        >
          ←
        </span>
        {steps.map((step, i) => {
          // current step
          if (i === stepNumber)
            return (
              <div
                key={i}
                className="-translate-y-1 duration-300 relative text-accent-green cursor-pointer text-5xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                onClick={() => handleClick(i)}
              >
                {formData[step.name] ? <div className="text-accent-green absolute z-0">⬟</div> : null }
                <div className="relative z-10">⬠</div>
                {/* <div className="absolute top-[10px] left-[8px] text-xs font-bold text-white-text"> */}
                <div className={`absolute top-[16px] left-[17px] text-xs font-bold z-50 ${formData[step.name] ? "text-dark-green-shade" : "text-accent-green"}`}>
                  {i + 1}
                </div>
              </div>
            );
          else if (formData[step.name])
            // if step is completed
            return (
              <div
                key={i}
                className="relative cursor-pointer text-5xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                onClick={() => handleClick(i)}
              >
                <div className="text-primary-green-darker-shade">⬟</div>
                <div className="text-dark-text absolute top-[16px] left-[17px] text-xs font-bold z-50">
                  {i + 1}
                </div>
              </div>
            );
          else
            // if step hasn't been completed yet
            return (
              <div
                key={i}
                className="group relative cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
                onClick={() => handleClick(i)}
              >
                <div
                  className={`${errorMessages?.[step.name] ? "text-red-500" : "text-primary-green-darker-shade"}`}
                >
                  ⬠
                </div>
                <div className="text-primary-green absolute top-[16px] left-[17px] text-xs opacity-100 group-hover:opacity-100 z-50">
                  {i + 1}
                </div>
              </div>
            );
        })}
        <span
          className={`hover:text-white-text cursor-pointer text-4xl ${stepNumber === 4 && "invisible"}`}
          onClick={handleForward}
        >
          →
        </span>
      </div>
      <div className="flex flex-col items-center justify-center text-xs text-red-500">
        {Object.values(errorMessages).map((error) => (
          <div>{error}</div>
        ))}
      </div>
    </div>
  );
}
