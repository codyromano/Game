import React, { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { momo } from "./characters/MomoCharacter";
import getCharacterPositions from "./explore/getCharacterPositions";
import tiles from "./explore/tiles";

export interface GameState {
  currentPosition: [number, number];
  characterPositions: Record<string, string>;
  charactersDefeatedByPosition: Record<string, string>;
  momo: {
    health: number;
    energy: number;
  };
}

export const getInitialState = (): GameState => {
  const currentPosition: [number, number] = [10, 5];

  const state = {
    currentPosition,
    characterPositions: getCharacterPositions({}, currentPosition, tiles),
    charactersDefeatedByPosition: {},
    momo: {
      health: 100,
      energy: 100,
    },
  };
  // momo.deserialize(state);
  return state;
};

const initialGameState = getInitialState();

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
          console.log('prevState: ', prevState);

          // Recalculate available characters only when the player moves
          if (updatedProperties.currentPosition) {
            newState.characterPositions = getCharacterPositions(
              prevState.characterPositions,
              updatedProperties.currentPosition,
              tiles,
            );
          }

          // Ensure the momo singleton receives state changes
          // TODO: The logic of combining this singleton & a state object in the provider
          // is a little confusing.
          momo.deserialize(newState);

          console.log('newState: ', newState);

          return newState;
        });
      },
      setState: setGameState,
    }),
    [gameState],
  );

  useEffect(() => {
    console.log('gameState: ', gameState);
  }, [gameState]);

  return (
    <GameStateContext.Provider value={gameStateProviderValue}>
      {children}
    </GameStateContext.Provider>
  );
};
