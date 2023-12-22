import React, { useEffect, useState } from "react";

interface TypewriterProps {
  message: string;
  onMessageFullyTyped: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
  message,
  onMessageFullyTyped,
}) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  // console.log("m: ", message);

  useEffect(() => {
    // If it's the last character, wait for one second and execute the callback
    if (displayedMessage.length === message.length) {
      setTimeout(() => {
        onMessageFullyTyped();
      }, 2000);
    }
  }, [displayedMessage]);

  useEffect(() => {
    // Clear existing text if the message prop changes
    setDisplayedMessage("");

    // Type each character one by one
    const timeoutId = setInterval(() => {
      setDisplayedMessage((m) => {
        if (message == null) {
          return "";
        }
        return message.slice(0, m.length + 1);
      });
    }, 75);

    return () => {
      // Clear any ongoing timeouts when the component unmounts or when the message changes
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <div>
      <p>{displayedMessage?.length ? displayedMessage : "..."}</p>
    </div>
  );
};

export default Typewriter;
