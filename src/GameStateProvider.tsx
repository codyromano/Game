import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { momo } from "./characters/MomoCharacter";
import getCharacterPositions from "./explore/getCharacterPositions";
import tiles from "./explore/tiles";
import getItemPositions from "./explore/getItemPositions";
import { ItemName } from "./items/BaseItem";
import Storage from "./utils/Storage";

export interface GameState {
  currentPosition: [number, number];
  previousPosition: [number, number];
  characterPositions: Record<string, string>;
  charactersDefeatedByPosition: Record<string, string>;
  items: Record<
    string,
    {
      itemName: ItemName;
      timeLastUsed: number | null;
      coords: [number, number];
    }
  >;
  momo: {
    health: number;
    energy: number;
  };
}

const gameStorage = new Storage<GameState, string>();

export const getInitialState = (): GameState => {
  const currentPosition: [number, number] = [11, 9];

  const state = {
    currentPosition,
    previousPosition: currentPosition,
    characterPositions: getCharacterPositions({}, currentPosition, tiles),
    charactersDefeatedByPosition: {},
    items: getItemPositions({}, currentPosition, tiles),
    momo: {
      health: 100,
      energy: 100,
    },
  };
  // momo.deserialize(state);
  return state;
};

const initialGameState = gameStorage.get("game") ?? getInitialState();
// const initialGameState = getInitialState();

// Create the context
export const GameStateContext = createContext<GameStateProviderValue>({
  state: initialGameState,
  updateState: () => {},
  setState: () => {},
});

type GameStateProviderValue = {
  state: GameState;
  updateState: (updatedProperties: Partial<GameState>) => void;
  setState: (value: React.SetStateAction<GameState>) => void;
};

// Provider component to wrap the app and provide the game state
export const GameStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const gameStateProviderValue: GameStateProviderValue = useMemo(
    () => ({
      state: gameState,
      updateState: (updatedProperties: Partial<GameState>) => {
        setGameState((prevState) => {
          const newState = { ...prevState, ...updatedProperties };

          // Recalculate available characters and items only when the player moves
          if (updatedProperties.currentPosition) {
            newState.characterPositions = getCharacterPositions(
              prevState.characterPositions,
              updatedProperties.currentPosition,
              tiles,
            );

            newState.items = getItemPositions(
              prevState.items,
              updatedProperties.currentPosition,
              tiles,
            );
          }

          // Ensure the momo singleton receives state changes
          // TODO: The logic of combining this singleton & a state object in the provider
          // is a little confusing.
          momo.deserialize(newState);
          return newState;
        });
      },
      setState: setGameState,
    }),
    [gameState],
  );

  useEffect(() => {
    // Update available characters when player position changes
    setGameState(prevState => ({
      ...prevState,
      characterPositions: getCharacterPositions(
        prevState.characterPositions,
        prevState.currentPosition,
        tiles,
      ),
      items: getItemPositions(
        prevState.items,
        prevState.currentPosition,
        tiles,
      )
    }));
  }, [gameState.currentPosition]);

  useEffect(() => {
    gameStorage.save("game", gameState);
  }, [gameState]);

  return (
    <GameStateContext.Provider value={gameStateProviderValue}>
      {children}
    </GameStateContext.Provider>
  );
};
