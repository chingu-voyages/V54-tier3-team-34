import React, { useState } from "react";
import AppExplanation from "./AppExplanation";
import Button from "./Button";

export default function Header() {
  const [explanationOpen, setExplanationOpen] = useState(false);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-10 text-center text-4xl text-green-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        Penta AI
      </h1>
      <div className="text-xs text-white">{formattedDate}</div>
      <div
        className="cursor-pointer font-bold text-white bg-green-500 rounded-3xl text-sm py-1 px-2"
        onClick={() => setExplanationOpen((prev) => !prev)}
      >
        help!
      </div>

      {explanationOpen && (
        <AppExplanation setExplanationOpen={setExplanationOpen} />
      )}
    </div>
  );
}
