import React, { useState, useEffect, useRef } from "react";

export default function TextArea({
  title,
  description,
  inputValue,
  handleChange,
  handleKeyDown,
}) {
  const [tooltip, setTooltip] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Focus the textarea whenever the title (current step) changes
    textareaRef.current?.focus();
  }, [title]);

  return (
    <>
      {/* textarea */}
      <textarea
              ref={textareaRef}



              
        className="peer font-paragraph text-primary-green mt-12 mr-8 mb-4 field-sizing-content max-h-36 min-h-12 resize-none overflow-y-auto rounded-[inherit] pr-2 pl-8 outline-none 
        
          [&::-webkit-scrollbar]:w-2.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-track]:bg-dark-green-shade
  [&::-webkit-scrollbar-thumb]:bg-dark-green-background

        
        "
        value={inputValue}
        name={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required
      />
      {/* label */}
      <label
        htmlFor={title}
        className="text-primary-green 
        
        peer-valid:bg-primary-green 
        peer-valid:text-dark-text peer-valid:border-dark-green-background 
        
    rounded-lg

        peer-valid:-translate-y-3
        peer-focus:-translate-y-3
        peer-focus:bg-primary-green 
        peer-focus:text-dark-text peer-focus:border-dark-green-background 
        
        pointer-events-none absolute   border-transparent/1 bg-none px-6 py-1 font-normal transition-all duration-300 ease-out"
      >
        {title.slice(0, 1).toUpperCase() + title.slice(1)}
      </label>
      {/* open/close tooltip*/}
      <div className="peer/tooltip text-dark-text absolute top-2 right-2 cursor-pointer">
        <button
          type="button"
          className={` hover:bg-accent-green flex h-5 w-5 items-center justify-center rounded-full ${tooltip ? "bg-accent-green" : "bg-primary-green"}`}
          onClick={() => setTooltip((prev) => !prev)}
        >
          {!tooltip ? "?" : "X"}
        </button>
      </div>
      {/* tooltip */}
      <div
        className={`font-paragraph bg-primary-green pointer-events-none absolute -top-18 right-3 z-100 min-h-14 rounded-lg p-3 tracking-wider opacity-0 transition-all peer-hover/tooltip:opacity-100 ${tooltip && "opacity-100"}`}
      >
        {description}
        <div className="text-bubble bg-primary-green absolute right-2 -bottom-5 h-7 w-7"></div>
      </div>
    </>
  );
}
