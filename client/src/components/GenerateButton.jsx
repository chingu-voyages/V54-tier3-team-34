import React from "react";

export default function GenerateButton({ formData, disabled }) {
  // check to see if all fields have been entered
  const allValues = Object.values(formData).every((value) => value.length > 1);

  return (
    <button
      disabled={disabled} // can be used to add specific css
      tabIndex={0}
      type="submit"
      className="fixed right-3 bottom-3 z-100 flex cursor-pointer items-center justify-center hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
    >
      <div
        className={`absolute z-10 ${allValues ? "animate-grow-text text-lg leading-[14px]" : "text-xs leading-[10px]"} text-dark-text transition-all duration-500`}
      >
        <div>gen</div>
        <div>er</div>ate
      </div>
      <div
        className={`penta animate-rotate bg-dark-backround absolute h-13 w-13 ${allValues && "animate-grow h-17 w-17"} transition-all duration-500`}
      ></div>
      <div
        className={`penta animate-rotate bg-primary-green relative h-12 w-12 ${allValues && "animate-grow h-16 w-16"} transition-all duration-500`}
      ></div>
    </button>
  );
}
