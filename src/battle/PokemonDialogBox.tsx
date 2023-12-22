// PokemonDialogueBox.tsx
import React, { useState } from "react";
import "./PokemonDialogueBox.css";
import Typewriter from "./TypeWriter";

interface PokemonDialogueBoxProps {
  messages: string[];
  onSelectOption: (option: string) => void;
  options?: string[];
}

const PokemonDialogueBox: React.FC<PokemonDialogueBoxProps> = ({
  messages,
  options,
  onSelectOption,
}) => {
  const [messageIndex, setMessageIndex] = useState<number>(0);

  return (
    <div className="pokemon-dialogue-box">
      <Typewriter
        message={messages[messageIndex]}
        onMessageFullyTyped={() => {
          setMessageIndex((i) => {
            return i < messages.length - 1 ? i + 1 : i;
          });
        }}
      />
      {options != null && (
        <ul className="pokemon-menu">
          {options.map((label) => (
            <li className="pokemon-menu-item" key={label}>
              <button onClick={() => onSelectOption(label)}>{label}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonDialogueBox;
