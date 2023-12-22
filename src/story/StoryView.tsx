import { useState } from "react";
import Story from "./Story";
import StorySection from "./StorySection";
import "./StoryView.css";

export default function StoryView() {
  // TODO: Adjust number of visible lines based on game progress - e.g. enemeies defeated
  const linesUnlocked = 1000;
  const progress = Story.getProgressPercentage(linesUnlocked);
  const storySections = Story.getStoryText(linesUnlocked);

  const [currentSection, setCurrentSection] = useState(0);

  const handleNextSection = () => {
    setCurrentSection((prev) => prev + 1);
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  return (
    <main>
      <div className="center-content">
        {storySections.map((section, i) => (
          <StorySection sectionIndex={i} key={i}>
            {i === 0 && <h1 className="story-main-title">A Christmas Story</h1>}
            <p>{section}</p>
          </StorySection>
        ))}

        {progress < 100 && (
          <p className="story-text story-text-notice">
            You&apos;ve unlocked {progress}% of the story. Defeat more raccoons
            to read it all!
          </p>
        )}
      </div>
    </main>
  );
}
