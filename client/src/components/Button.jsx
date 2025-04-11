import React from "react";

export default function Button({ text, onClick, name, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      name={name}
      className={` ${disabled ? "pointer-events-none bg-green-200" : "bg-primary-green"} px-3 py-1 shadow-sm shadow-dark-green-background/80 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_white] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_white] ${name === "constraint" && text === "continue" && "invisible"} hover:bg-accent-green rounded-sm`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
