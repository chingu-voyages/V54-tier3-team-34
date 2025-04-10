import React, { useState } from "react";

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
        className="pointer-events-none absolute top-0 left-1 m-2 bg-dark-backround px-1 text-primary-green transition-all duration-400 peer-valid:-top-[15px] peer-valid:primary-green peer-valid:text-xs peer-valid:text-white-text peer-focus:-top-[15px] peer-focus:bg-primary-green peer-focus:text-xs peer-focus:text-dark-text"
      >
        {title.slice(0, 1).toUpperCase() + title.slice(1)}
      </label>
      {/* open/close tooltip*/}
      <div
        className="peer/tooltip absolute top-2 right-2 cursor-pointer text-dark-text"
      >
        <button type="button" className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-green"
        onClick={() => setTooltip((prev) => !prev)}
        >
          {!tooltip ? "?" : "X"}
        </button>
      </div>
      {/* tooltip */}
      <div
        className={`pointer-events-none absolute -top-18 right-3 z-100 min-h-14 rounded-lg bg-primary-green p-3 text-xs tracking-wider opacity-0 transition-all peer-hover/tooltip:opacity-100 ${tooltip && "opacity-100"}`}
      >
        {description}
        <div className="text-bubble absolute right-2 -bottom-5 h-7 w-7 bg-primary-green"></div>
      </div>
    </>
  );
}
