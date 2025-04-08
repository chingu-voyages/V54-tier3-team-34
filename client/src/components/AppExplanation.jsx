import React, { useEffect, useState } from "react";

export default function AppExplanation({ setExplanationOpen }) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e.key);
      if (e.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (e.key === "ArrowRight") {
        handleNextSlide();
      } else if (e.key === "Escape") {
        setExplanationOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slide]);

  const slides = [
    <p>
      The Pentagram Method is a structured approach to crafting effective AI
      prompts by ensuring all essential components are included. It breaks down
      a prompt into five key elements. By following this method, users can
      create well-structured prompts that yield more accurate and useful AI
      responses.
    </p>,
    <p>
      <strong className="text-white">Persona</strong> – Defines the role the AI
      should take (e.g., 'You are a marketing expert...').
    </p>,
    <p>
      <strong className="text-white">Context</strong> – Provides background
      information for better understanding.
    </p>,
    <p>
      <strong className="text-white">Task</strong> – Clearly states what needs
      to be done.
    </p>,
    <p>
      <strong className="text-white">Output</strong> – Specifies the desired
      format or response style.
    </p>,
    <p>
      <strong className="text-white">Constraints</strong> – Sets limitations or
      additional instructions (e.g., word limit, tone).
    </p>,
  ];

  const handlePrevSlide = () => {
    if (slide === 0) return;
    setSlide((prev) => (prev -= 1));
  };

  const handleNextSlide = () => {
    if (slide > 5) return;
    setSlide((prev) => (prev += 1));
  };
  return (
    <div className="absolute inset-0 z-[101] flex items-center justify-center bg-black/60">
      <div className="penta relative z-[110] flex aspect-square w-[400px] flex-col items-center bg-green-500 md:w-[600px]">
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 cursor-pointer font-bold"
          onClick={() => setExplanationOpen((prev) => !prev)}
        >
          <div className="peer flex h-5 w-5 items-center justify-center rounded-full bg-black text-white hover:bg-white hover:text-black">
            X
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center justify-center px-20 md:mt-30">
          <h2 className="text-lg font-bold md:text-2xl">Pentagram Method</h2>
          <div className="mt-10 text-xs md:mt-24 md:text-base">
            {slides[slide]}
          </div>
          <div className="absolute bottom-20 flex gap-10 text-white md:bottom-30">
            <div
              className={`cursor-pointer text-2xl hover:text-black ${slide === 0 && "invisible"}`}
              onClick={handlePrevSlide}
            >
              ←
            </div>
            <div
              className={`cursor-pointer text-2xl hover:text-black ${slide === 5 && "invisible"}`}
              onClick={handleNextSlide}
            >
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
