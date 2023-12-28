// StorySection.tsx
import React, { useRef, useState } from "react";

interface StorySectionProps {
  children: React.ReactNode;
  sectionIndex: number,

}

// TODO: Enable snappy scrolling

// Unit is vh
/* eslint-disable */
const STORY_CONTAINER_HEIGHT = 80;

const StorySection: React.FC<StorySectionProps> = ({
  children,
  sectionIndex,
}) => {
  const [activeSection, setActiveSection] = useState<number>(sectionIndex);
  const animationIsActiveRef = useRef<boolean>(false);
  const handleTouchStart = () => {

    if (!animationIsActiveRef.current) {
    animationIsActiveRef.current = true;
    setActiveSection(i => ++i);
    }
  };

  return (
    <div
      className="story-scroll-container"
      style={{
        /*
        height: `${STORY_CONTAINER_HEIGHT}vh`,
        touchAction: "pan-y",
        transform: `translate3d(0, -${STORY_CONTAINER_HEIGHT * activeSection}vh, 0)`,
        */
      }}
      onMouseDown={handleTouchStart}

      onTransitionEnd={() => {

        animationIsActiveRef.current = false;
      }}
    >
      {children}
    </div>
  );
};
/* eslint-enable */

export default StorySection;
