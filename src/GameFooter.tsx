// import Story from "./story/Story";

type Props = {
  energy: number;
  health: number;
};

// eslint-disable-next-line
export default function GameFooter({ energy, health }: Props) {
  return (
    <footer>
      <div className="center-content">
        <div className="progress-container">
          {/* TODO: Renable this to add energy system */}
          {/*
          <label htmlFor="energyBar" className="progress-label">
            Energy
          </label>
          <progress id="energyBar" value={energy} max="100"></progress>
          */}

          <label htmlFor="storyProgress" className="progress-label">
            {/* Progress {Story.getProgressPercentage(30)} */}
            Health
          </label>
          <progress id="storyProgress" value={health} max="100"></progress>

          {/*

          <label htmlFor="healthBar" className="progress-label">
            Health
          </label>
          <progress id="healthBar" value={health} max="100"></progress>
        */}
        </div>
      </div>
    </footer>
  );
}
