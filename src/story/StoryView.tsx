
import { Link } from "react-router-dom";
import Story from "./Story";
import StorySection from "./StorySection";
import "./StoryView.css";
import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider";
// eslint-disable-next-line
import useScrollToBottom from "./useScrollToBottom";

const storyImages: Record<string, string> = {
  0: '/images/story/story0.jpeg',
  4: '/images/characters/rocky-full-alpha.png',
  [Story.getTotalLines() - 1]: '/images/story/sweaters.jpeg'
};

export default function StoryView() {
  // eslint-disable-next-line
  const { state: gameState } = useContext(GameStateContext);

  // TODO: Renable this
  useScrollToBottom();

  // TODO: Add a multiplier to limit # of enemies you have to defeat?
  const linesUnlocked = Object.keys(gameState.charactersDefeatedByPosition).length;
  // const linesUnlocked = 1000;
  const progress = Story.getProgressPercentage(linesUnlocked);
  const storySections = Story.getStoryText(linesUnlocked);


  return (
    <main>
        <StorySection sectionIndex={0}>
          {storySections.map((section, i) => (
            <section className="story-text-container" style={{
              maxWidth: "1000px",
              margin: "0 auto",
            }} key={i}>

              {i === 0 && <h1 className="story-main-title" style={{
                fontSize: '15px'
              }}>A Christmas Story</h1>}
              {/* TODO: Move to CSS file */}
              {storyImages[i] != null && <div style={{
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                width: "100%",
                height: "50vh",
                backgroundPosition: 'center',
                backgroundImage: `url(${storyImages[i]})`
              }} className="story-image" />}

              <div className="center-content">
                <p>{section}</p>
              </div>
            </section>
          ))}

          {progress < 100 && (
            <div className="center-content">
            <p className="story-text story-text-notice">
              You&apos;ve unlocked {progress}% of the storyline. Defeat more enemies to read it all.
            </p>
              <p><Link to="/" style={{
                fontSize: '1.5rem',
                display: 'block',
                margin: '1rem auto',
              }}>Back to Game</Link></p>
            </div>
          )}

          {progress >= 100 && (
            <div className="center-content">
          <p className="story-text story-text-notice" style={{
            padding: '3rem 1rem'
          }}>
            You beat the game! Thanks for playing
          </p>
          </div>
          )}
        </StorySection>

    </main>
  );
}
