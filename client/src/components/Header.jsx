import React from "react";

export default function Header() {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 class="mt-10 text-center text-4xl text-green-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        Penta AI
      </h1>
      <div className="text-xs text-green-500">{formattedDate}</div>
    </div>
  );
}
