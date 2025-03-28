import React, { useState } from "react";

export default function TextArea({title, placeholder, inputValue, handleChange }) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <>
      <textarea
        className="peer field-sizing-content min-h-52 w-full border border-green-500 p-3 pt-8 pb-12 text-green-500 outline-offset-3 valid:pt-2 valid:outline valid:outline-green-500 focus:pt-2 focus:outline focus:outline-green-500"
        // placeholder={placeholder}
        value={inputValue}
        name={title}
        onChange={handleChange}
        required
      ></textarea>
      <div className="absolute top-2 right-2 cursor-pointer text-white" onClick={() => setTooltip(prev => !prev)}>
        <div className="peer flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
          {!tooltip ? "?" : "X"}
        </div>
        <div className={`pointer-events-none absolute right-5 z-100 min-w-[300px] bg-green-500 p-3 text-xs tracking-wider opacity-0 transition-all peer-hover:opacity-100 ${tooltip && "opacity-100"}`}>
          {placeholder}
        </div>
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
