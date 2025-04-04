import React from "react";

export default function GenerateButton() {
  return (
    <button
      type="submit"
      className="fixed right-3 bottom-3 z-100 flex cursor-pointer items-center justify-center hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
    >
      <div className="absolute z-10 text-xs leading-[10px] text-white">
        <div>gen</div>
        <div>er</div>ate
      </div>
      <div className="penta animate-rotate absolute h-13 w-13 bg-black"></div>
      <div className="penta animate-rotate relative h-12 w-12 bg-green-500"></div>
    </button>
  );
}
