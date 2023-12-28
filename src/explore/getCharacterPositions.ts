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

  traverseMapCoordsNearPlayer(
    currentPosition,
    currentPosition,
    (coords) => {
      const isPlayerPosition =
        coords[0] === currentPosition[0] && coords[1] === currentPosition[1];

      // Don't spawn stuff on top of the player
      if (isPlayerPosition) {
        return;
      }

      // Don't spawn any character in a tile where a character was previously defeated
      const existingCharacter = CharacterFactory.getAtPosition(...coords);
      if (existingCharacter?.getHealth() === 0) {
        return;
      }

      for (const character of characters) {
        const tileType = tiles[coords[0]][coords[1]];
        // Assign a character to the tile if it makes sense for them
        // to appear there
        if (
          character.isEligibleForTile(tileType, coords) &&
          Math.random() <= character.getSpawnProbability()
        ) {
          characterPositions[`${coords[0]},${coords[1]}`] =
            character.characterName;


          CharacterFactory.createAtPosition(coords[0], coords[1], character.characterName);
        }
      }
    },
    tiles,
  );

  return characterPositions;
}
