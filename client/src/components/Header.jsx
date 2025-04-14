import React from "react";
import AppExplanation from "./AppExplanation";

export default function Header({ setExplanationOpen }) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-dark-green-background sticky top-0 mt-5 flex w-full items-center justify-between p-5 md:static md:flex-col">
      <h1 className="text-primary-green text-center text-4xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        Penta AI
      </h1>
      <div className="flex items-center justify-center gap-3 md:flex-col">
        <div className="text-xs text-white">{formattedDate}</div>
        <div
          className="bg-primary-green text-dark-text cursor-pointer rounded-3xl px-2 py-1 text-sm font-bold"
          onClick={() => setExplanationOpen((prev) => !prev)}
        >
          help!
        </div>
      </div>
    </div>
  );
}
