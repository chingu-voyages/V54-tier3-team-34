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
    <p className="font-paragraph">
      The Pentagram Framework is a structured approach to crafting effective AI
      prompts by ensuring all essential components are included. It breaks down
      a prompt into five key elements. By following this framework, users can
      create well-structured prompts that yield more accurate and useful AI
      responses.
    </p>,
    <p className="font-paragraph">
      <strong className="text-dark-text">Persona</strong> – Defines the role the AI
      should take (e.g., 'You are a marketing expert...').
    </p>,
    <p className="font-paragraph">
      <strong className="text-dark-text">Context</strong> – Provides background
      information for better understanding.
    </p>,
    <p className="font-paragraph">
      <strong className="text-dark-text">Task</strong> – Clearly states what needs
      to be done.
    </p>,
    <p className="font-paragraph">
      <strong className="text-dark-text">Output</strong> – Specifies the desired
      format or response style.
    </p>,
    <p className="font-paragraph">
      <strong className="text-dark-text">Constraints</strong> – Sets limitations or
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
    <div className="fixed inset-0 z-[101] flex items-center justify-center bg-dark-backround/60">
      <div className="penta relative z-[110] flex aspect-square w-[400px] flex-col items-center bg-primary-green md:w-[600px]">
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 cursor-pointer font-bold"
          onClick={() => setExplanationOpen((prev) => !prev)}
        >
          <button className="peer flex h-5 w-5 items-center justify-center rounded-full bg-dark-backround text-white-text hover:bg-white-text hover:text-dark-text">
            X
          </button>
        </div>

        <div className="mt-20 md:mt-30 flex flex-col items-center justify-center px-20">
          <h2 className="text-lg md:text-2xl font-bold">Pentagram Framework</h2>
          <div className="mt-10 text-xs md:mt-24 md:text-base">
            {slides[slide]}
          </div>
          <div className="absolute bottom-10 flex gap-10 md:bottom-30 text-dark-text">
            <button
              className={`cursor-pointer text-5xl hover:text-white-text ${slide === 0 && "invisible"}`}

              onClick={handlePrevSlide}
            >
              ←
            </button>
            <button
              className={`cursor-pointer text-5xl hover:text-white-text ${slide === 5 && "invisible"}`}
              onClick={handleNextSlide}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
