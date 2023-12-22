// Slide.tsx
import React from "react";
import "./Slide.css";

interface SlideProps {
  children: React.ReactNode;
  direction: "left" | "right";
}

const Slide: React.FC<SlideProps> = ({ direction, children }) => {
  return <div className={`slide-container ${direction}`}>{children}</div>;
};

export default Slide;
