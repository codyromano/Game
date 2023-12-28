import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { momo } from "../characters/MomoCharacter";
import {
  GameState,
  GameStateContext,
  getInitialState,

} from "../GameStateProvider";
import "./CutScene.css";
import ItemFactory from "../items/ItemFactory";
import BaseItem from "../items/BaseItem";

// TODO: This is a gross hack because we use the current coordinates to identify the item,
// but we also need to clear the coordinates. It would make more sense to pass an item uuid.
// let itemAtCurrentPosition: BaseItem;

const getItemAtCurrentPosition = (state: GameState): BaseItem => {

  const item = ItemFactory.getItemAtCoords(state.currentPosition);

  if (item == null) {
    throw new Error(`No item exists at position ${state.currentPosition.join(',')}`);
  }
  return item;
  /*
  
  if (itemAtCurrentPosition != null) {
    return itemAtCurrentPosition;
  }
  const position = state.currentPosition.join(',');
  const itemInfo = state.items[position];

  if (itemInfo == null) {
    console.log(state);
    throw new Error(`No item exists at position ${position}`);
  }

  const itemObject = ItemFactory.create(itemInfo);
  itemAtCurrentPosition = itemObject;
  return itemObject;
  */
}

const cutSceneImages: Record<string, (state: GameState) => string> = {
  "battle-win": () => "/images/characters/joycie-full.png",
  fainted: () => "/images/cutscenes/momo-fainted.jpeg",
  run: () => "/images/characters/joycie-full.png",
  // TODO: Display different item depending on item type
  item: (state) => {
    const itemObject = getItemAtCurrentPosition(state);
    return itemObject.imageFull;
  }
};

const headings: Record<string, (state: GameState) => string> = {
  "battle-win": () => "Victory!",
  fainted: () => "Momo Fainted",
  item: (state) => {
    const itemObject = getItemAtCurrentPosition(state);
    return itemObject.displayName;
  },
  run: () => "Escaped",
};

const descriptions: Record<string, (state: GameState) => string> = {
  "battle-win": () => "You gained XP and unlocked part of a Christmas story!",
  fainted: () =>
    "Momo was running low on energy or health, and he needed to take a nap.",
  run: () => "You rushed out of harm's way 😅",
  item: (state) => {
    const itemObject = getItemAtCurrentPosition(state);
    itemObject.useItem(momo);
    return itemObject.getLastUseItemResult()?.effectDescription ?? 'Unknown effect';
  },
};

const buttons: Record<string, () => Array<{ text: string; url: string }>> = {
  "battle-win": () => [{ text: "Read Storyline", url: "/story" }],
  fainted: () => [{ text: "Play again", url: "/" }],
  run: () => [{ text: "Continue", url: "/" }],
  item: () => [{ text: "Continue", url: "/" }],
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

  run: (state) => {
    return {
      ...state,
      currentPosition: state.previousPosition,
    }
  },


  item: (state) => {
    const itemObject = getItemAtCurrentPosition(state);

    console.log('current state: ', state);
    const newState = {
      ...state,
      ...itemObject.serialize(state),
    };
    console.log('new state: ', newState);

    return newState;
  },
};

export default function CutScene() {
  const sceneId = useParams().sceneId ?? "";
  const { setState, state: gameState } = useContext(GameStateContext);

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
          style={{ backgroundImage: `url(${cutSceneImages[sceneId](gameState)})` }}
        />
        <h1 className="cut-scene-title">{headings[sceneId](gameState)}</h1>
        <p>{descriptions[sceneId](gameState)}</p>

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
