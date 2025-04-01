import React from "react";

export default function ProgressBar({ steps, stepNumber, setStepNumber, errorMessage }) {
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
    setStepNumber(number)
  }

  return (
    <div className="flex w-full items-center justify-center gap-5 text-4xl text-green-500">
      <span
        className={`mt-2 cursor-pointer text-2xl hover:text-white ${!stepNumber && "invisible"}`}
        onClick={handleBack}
      >
        ←
      </span>
      {steps.map((step, i) => {
        if (i === stepNumber)
          return (
            <div key={i} className="translate-y-[1.5px] text-2xl cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" onClick={() => handleClick(i)}>
              <div>⬟</div>
              <div className="absolute font-bold text-xs top-[10px] left-[8px] text-black">{i+1}</div>
            </div>
          );
        else
          return (
            <div key={i} className="group relative cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]" onClick={() => handleClick(i)}>
              <div className={`${!!errorMessage?.[step.name] ? "text-red-500" : ""}`}>⬠</div>
              <div className="absolute text-xs top-[16px] left-[9px] text-white opacity-0 group-hover:opacity-100 transition-all">{i + 1}</div>
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
  );
}
