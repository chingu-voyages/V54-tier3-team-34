import React from "react";

export default function TextArea({ title, placeholder }) {
  return (
    <>
      <textarea
        class="peer field-sizing-content min-h-52 w-full border border-green-500 p-3 pt-8 pb-12 text-green-500 outline-offset-3 valid:pt-2 valid:pb-2 valid:outline valid:outline-green-500 focus:pt-2 focus:pb-18 focus:outline focus:outline-green-500"
        placeholder={placeholder}
        required
      ></textarea>
      <label
        for={title}
        class="pointer-events-none absolute top-0 left-1 m-2 bg-black px-1 text-green-500 transition-all duration-400 peer-valid:-top-[15px] peer-valid:bg-green-500 peer-valid:text-xs peer-valid:text-white peer-focus:-top-[15px] peer-focus:bg-green-500 peer-focus:text-xs peer-focus:text-white"
      >
        {title.slice(0,1).toUpperCase() + title.slice(1)}
      </label>
    </>
  );
}
