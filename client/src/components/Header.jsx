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
      <h1 className="mt-10 text-center text-4xl text-primary-green drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        Penta AI
      </h1>
      <div className="text-xs text-white-text mb-2">{formattedDate}</div>
      <button
        className="cursor-pointer font-bold text-dark-text bg-primary-green rounded-3xl text-sm py-1 px-2"

        onClick={() => setExplanationOpen((prev) => !prev)}
        tabIndex={0}
      >
        help!
      </button>

      {explanationOpen && (
        <AppExplanation setExplanationOpen={setExplanationOpen} />
      )}
    </div>
  );
}
