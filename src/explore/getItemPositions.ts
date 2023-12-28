// import CharacterFactory from "../characters/CharacterFactory";
import { TileType } from "../explore/tiles";
import { GameState } from "../GameStateProvider";
import ItemFactory from "../items/ItemFactory";
// import LevelUpStarItem from "../items/LevelUpStarItem";
import traverseMapCoordsNearPlayer from "./traverseMapCoordsNearPlayer";

const allAvailableItems = ItemFactory.getAllItems();

export default function getItemPositions(
  existingItems: GameState["items"],
  currentPosition: [number, number],
  tiles: TileType[][],
): GameState['items'] {
  const itemPositions: GameState['items'] = {};

  traverseMapCoordsNearPlayer(
    currentPosition,
    currentPosition,
    (coords) => {
      const positionKey = coords.join(',');
      const isPlayerPosition =
        coords[0] === currentPosition[0] && coords[1] === currentPosition[1];

      // Don't spawn stuff on top of the player
      if (isPlayerPosition) {
        return;
      }

      // Don't spawn items in a tile where an item already exists 
      if (existingItems[positionKey]) {
        return;
      }

      for (const item of allAvailableItems) {
        const itemObject = ItemFactory.createWithoutCache({
          itemName: item.itemName,
          timeLastUsed: null,
          coords,
        });

        const tileType = tiles?.[coords[0]]?.[coords[1]];

        // Spawn a new item
        if (itemObject.isEligibleForTile(tileType)) {
          itemPositions[`${coords[0]},${coords[1]}`] = {
            itemName: itemObject.itemName,
            timeLastUsed: null,
            coords,
          };
        }
      }

      // Check if an item already exists at this location either from a previous
      // render or from loading a saved game
      // const existingItem = existingItems[`${coords[0]},${coords[1]}`];
      // const deserializedItem = new LevelUpStarItem();

      /*
      for (const character of characters) {
        const tileType = tiles[coords[0]][coords[1]];
        // Assign a character to the tile if it makes sense for them
        // to appear there
        if (
          character.isEligibleForTile(tileType) &&
          Math.random() <= character.getSpawnProbability()
        ) {
          // TODO: Add some entropy as part of character eligibility check
          itemPositions[`${coords[0]},${coords[1]}`] = character.name;
        }
      }
      */
    },
    tiles,
  );

  return {...existingItems, ...itemPositions};
}
