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
      <textarea
        className="field-sizing-content min-h-52 w-full border border-green-500 p-3 pt-8 pb-12 text-green-500 outline-offset-3 valid:pt-2 valid:outline valid:outline-green-500 focus:pt-2 focus:outline focus:outline-green-500"
        value={inputValue}
        name={title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required
      />
      <div
        className="peer absolute top-2 right-2 cursor-pointer text-white"
        onClick={() => setTooltip((prev) => !prev)}
      >
        <div className="peer flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
          {!tooltip ? "?" : "X"}
        </div>
      </div>
      <div
        className={`pointer-events-none absolute -top-18 right-3 z-100 min-h-14 rounded-lg bg-green-500 p-3 text-xs tracking-wider opacity-0 transition-all peer-hover:opacity-100 ${tooltip && "opacity-100"}`}
      >
        {description}
        <div className="text-bubble absolute right-2 -bottom-5 h-7 w-7 bg-green-500"></div>
      </div>
      <label
        htmlFor={title}
        className="pointer-events-none absolute top-0 left-1 m-2 bg-black px-1 text-green-500 transition-all duration-400 peer-valid:-top-[15px] peer-valid:bg-green-500 peer-valid:text-xs peer-valid:text-white peer-focus:-top-[15px] peer-focus:bg-green-500 peer-focus:text-xs peer-focus:text-white"
      >
        {title.slice(0, 1).toUpperCase() + title.slice(1)}
      </label>
    </>
  );
}
