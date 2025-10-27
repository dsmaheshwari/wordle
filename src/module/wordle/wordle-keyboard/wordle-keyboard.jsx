import React from "react";
import "./wordle-keyboard.css";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

const ALPHAS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
];
const ALLOWED = new Set([...ALPHAS, "ENTER", "BACKSPACE"]);

function WordleKeyboard({ onKeyPress, disabled = false, className = "" }) {
  const handleClick = (key) => {
    if (key !== "ENTER" && key !== "BACKSPACE" && disabled) return;
    if (!ALLOWED.has(key)) return;
    if (typeof onKeyPress === "function") onKeyPress(key);
  };

  return (
    <div className={`wl-keyboard ${className}`} role="group" aria-label="On-screen keyboard">
      {ROWS.map((row, rIdx) => (
        <div className="wl-keyboard__row" key={`row-${rIdx}`}>
          {row.map((key) => {
            const isWide = key === "ENTER" || key === "BACKSPACE";
            return (
              <button
                type="button"
                key={key}
                className={`wl-keyboard__key ${isWide ? "wl-keyboard__key--wide" : ""}`}
                data-key={key}
                aria-label={key}
                onClick={() => handleClick(key)}
                // disabled={key === "ENTER" ? false : disabled}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default WordleKeyboard;
