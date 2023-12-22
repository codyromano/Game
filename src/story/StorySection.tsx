// StorySection.tsx
import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

interface StorySectionProps {
  children: React.ReactNode;
  onNextSection?: () => void;
  onPrevSection?: () => void;
}

const StorySection: React.FC<StorySectionProps> = ({
  children,
  onNextSection,
  onPrevSection,
}) => {
  const [isSwiping, setIsSwiping] = useState(false);

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    onFrame: ({ y }: { y: number }) => handleScroll(y),
  }));

  const handleScroll = (y: number) => {
    console.log("handleScroll");
    if (isSwiping) {
      return;
    }

    if (y >= 100 && onNextSection) {
      set({ y: y + 500 });

      onNextSection();
    } else if (y <= -100 && onPrevSection) {
      set({ y: y - 500 });
      onPrevSection();
    }
  };

  const handleTouchStart = () => {
    console.log("handleTouchStart");
    setIsSwiping(true);
  };

  const handleTouchEnd = () => {
    console.log("handleTouchEnd");
    setIsSwiping(false);
  };

  useEffect(() => {
    set({ y: 0 });
  }, [set]);

  return (
    <section
      className="story-text-container"
      style={{
        height: "90vh",
        overflow: "hidden",
        touchAction: "pan-y",
        backgroundColor: "teal",
        transform: y.to((value) => `translate3d(0, ${value}px, 0)`),
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </section>
  );
};

export default StorySection;
