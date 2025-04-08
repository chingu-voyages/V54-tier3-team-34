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
      <div className="flex w-full items-center justify-center gap-5 text-4xl text-green-500">
        <span
          className={`mt-2 cursor-pointer text-2xl hover:text-white ${!stepNumber && "invisible"}`}
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
                className="translate-y-[1.5px] cursor-pointer text-2xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                onClick={() => handleClick(i)}
              >
                <div>⬟</div>
                <div className="absolute top-[10px] left-[8px] text-xs font-bold text-black">
                  {i + 1}
                </div>
              </div>
            );
          else if (formData[step.name])
            // if step is completed
            return (
              <div
                key={i}
                className="translate-y-[1.5px] cursor-pointer text-2xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                onClick={() => handleClick(i)}
              >
                <div className="text-green-500/60">⬟</div>
                <div className="absolute top-[10px] left-[8px] text-xs font-bold text-black">
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
                  className={`${!!errorMessages?.[step.name] ? "text-red-500" : ""}`}
                >
                  ⬠
                </div>
                <div className="absolute top-[16px] left-[9px] text-xs text-white opacity-0 transition-all group-hover:opacity-100">
                  {i + 1}
                </div>
              </div>
            );
        })}
        <span
          className={`mt-2 cursor-pointer text-2xl hover:text-white ${stepNumber === 4 && "invisible"}`}
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
