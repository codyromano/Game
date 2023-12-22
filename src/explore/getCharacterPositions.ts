import CharacterFactory from "../characters/CharacterFactory";
import { TileType } from "../explore/tiles";
import traverseMapCoordsNearPlayer from "./traverseMapCoordsNearPlayer";
// import traverseMapCoordsNearPlayer from "./traverseMapCoordsNearPlayer";

export default function getCharacterPositions(
  // TODO: Pass correct value here. Now we're passing previous characters
  // Also, actually use this
  defeatedCharacterPositions: Record<string, string>,
  currentPosition: [number, number],
  tiles: TileType[][],
): Record<string, string> {
  const characterPositions: Record<string, string> = {};
  const characters = CharacterFactory.getAllCharacters();

  const charactersPlaced: Set<string> = new Set();

  traverseMapCoordsNearPlayer(
    currentPosition,
    currentPosition,
    (coords) => {
      const isPlayerPosition =
        coords[0] === currentPosition[0] && coords[1] === currentPosition[1];

      /*
      const isCharacterOnPosition =
        previousCharacterPositions[`${coords[0]},${coords[1]}`];
        */

      // Don't spawn stuff on top of the player
      if (isPlayerPosition) {
        return;
      }

      for (const character of characters) {
        const tileType = tiles[coords[0]][coords[1]];

        // TODO: Maybe you want multiple spawns for stuff like food
        // Don't assign more than one of a character type in the player's
        // fiew of view
        // if (charactersPlaced.has(character.name)) {
        // continue;
        // }

        // Assign a character to the tile if it makes sense for them
        // to appear there
        if (
          character.isEligibleForTile(tileType) &&
          Math.random() <= character.getSpawnProbability()
        ) {
          // TODO: Add some entropy as part of character eligibility check
          characterPositions[`${coords[0]},${coords[1]}`] = character.name;
          charactersPlaced.add(character.name);
        }
      }
    },
    tiles,
  );

  return characterPositions;
}
