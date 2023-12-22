import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { momo } from "../characters/MomoCharacter";
import {
  GameState,
  GameStateContext,
  getInitialState,

} from "../GameStateProvider";
import "./CutScene.css";

const cutSceneImages: Record<string, string> = {
  "battle-win": "/images/cutscenes/battle-win.jpeg",
  fainted: "/images/cutscenes/momo-fainted.jpeg",
};

const headings: Record<string, string> = {
  "battle-win": "You win!",
  fainted: "Momo Fainted",
};

const descriptions: Record<string, string> = {
  "battle-win": "You gained XP!",
  fainted:
    "Momo was running low on energy or health, and he needed to take a nap.",
};

const buttons: Record<string, () => Array<{ text: string; url: string }>> = {
  "battle-win": () => [{ text: "Continue", url: "/" }],
  fainted: () => [{ text: "Play again", url: "/" }],
};

const stateUpdates: Record<string, React.SetStateAction<GameState>> = {
  // Send player back to starting position and restore energy & health
  fainted: (state) => {
    momo.modifyEnergy(100);
    momo.modifyHealth(100);

    return {
      ...state,
      currentPosition: getInitialState().currentPosition,
      momo: {
        ...state.momo,
        health: 100,
        energy: 100,
      },
    };
  },
};

export default function CutScene() {
  const sceneId = useParams().sceneId ?? "";
  const { setState } = useContext(GameStateContext);

  useEffect(() => {
    const stateUpdater = stateUpdates[sceneId];
    if (stateUpdater != null) {
      console.log('update state');
      setState(stateUpdater);
    }
  }, [sceneId, setState]);

  return (
    <main className="cut-scene">
      <div className="center-content">
        <div
          className="cut-scene-image"
          style={{ backgroundImage: `url(${cutSceneImages[sceneId]})` }}
        />
        <h1 className="cut-scene-title">{headings[sceneId]}</h1>
        <p>{descriptions[sceneId]}</p>

        <p>
          {buttons[sceneId]().map((button) => (
            <Link key={button.url} to={button.url}>
              {button.text}
            </Link>
          ))}
        </p>
      </div>
    </main>
  );
}