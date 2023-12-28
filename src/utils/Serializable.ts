import { GameState } from "../GameStateProvider";

export interface Serializable<T> {
  serialize(state: GameState): Partial<GameState>;
  deserialize?(state: GameState): T;
}
