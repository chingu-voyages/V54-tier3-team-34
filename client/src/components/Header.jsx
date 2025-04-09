import React, { useState } from "react";
import AppExplanation from "./AppExplanation";

export default function Header({explanationOpen, setExplanationOpen}) {
//  const [explanationOpen, setExplanationOpen] = useState(false);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex md:flex-col items-center justify-between w-full mt-5 px-5 bg-black/90 p-2 sticky top-0">
      <h1 className="text-center text-4xl text-green-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        Penta AI
      </h1>
      <div className="flex md:flex-col items-center justify-center gap-3">
        <div className="text-xs text-white">{formattedDate}</div>
        <div
          className="cursor-pointer rounded-3xl bg-green-500 px-2 py-1 text-sm font-bold text-white"
          onClick={() => setExplanationOpen((prev) => !prev)}
        >
          help!
        </div>
      </div>

     
    </div>
  );
}
