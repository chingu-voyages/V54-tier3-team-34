import React, { useState } from "react";

export default function TextArea({
  title,
  description,
  inputValue,
  handleChange,
  handleKeyDown,
}) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <>
    {/* textarea */}
      <textarea
        className="peer field-sizing-content min-h-52 w-full border border-primary-green p-3 pt-8 pb-12 text-primary-green outline-offset-3 valid:pt-2 valid:outline valid:outline-primary-green focus:pt-2 focus:outline focus:outline-primary-green"
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
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-green"
        onClick={() => setTooltip((prev) => !prev)}
        >
          {!tooltip ? "?" : "X"}
        </div>
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
