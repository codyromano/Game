import PreloadAssets from "./PreloadAssets";
import tiles, { tileAttributes } from "./tiles";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import Map from "./Map2";
import { momo } from "../characters/MomoCharacter";
import { GameState, GameStateContext } from "../GameStateProvider";
import getNearestAllowablePosition from "./getNearestAllowablePosition";
// import { momo } from "../characters/MomoCharacter";

const filterUsedItems = (items: GameState['items']): GameState['items'] => {
  const newItems = {...items};
  for (const position in items) {
    const item = items[position];
    const isUsedItem = item.timeLastUsed != null && Date.now() - item.timeLastUsed <= 864000;

    if (isUsedItem) {
      delete newItems[position];
    }
  }
  return newItems;
};

export default function MapContainer() {
  const { state: game, setState: setGame } = useContext(GameStateContext);
  // eslint-disable-next-line
  const navigate = useNavigate();

  // Navigate to battle sequence if we land on a tile w/ a character
  useEffect(() => {
    const position = game.currentPosition.join(",");
    const positionHasCharacter =
      game.characterPositions[position];

    // TODO: The expiration time check shouldn't happen here. Ideally delegate to the item class
    const positionHasItem = filterUsedItems(game.items)[position] != null;
    const [x, y] = game.currentPosition;

    // TODO: For now, assume all characters are battle-able. This
    // may not necessary be true.
    if (positionHasCharacter) {
      navigate(`/battle/${x}/${y}`);
    } else if (positionHasItem) {
      navigate(`/cutscene/item`);
    }
    /*
    if (game.momo.energy === 0) {
      navigate("/cutscene/fainted");
    }
    */
  }, [game.currentPosition, game.items, game.characterPositions, game.momo.energy]);

  return (
    <PreloadAssets>
      {({ images }) => (
        <Map
          images={images}
          tiles={tiles}
          centerPosition={game.currentPosition}
          characterPositions={game.characterPositions}
          items={filterUsedItems(game.items)}
          onSelectTile={(position) => {
            const tileType = tiles?.[position[0]]?.[position[1]];
            const isTraversable = tileAttributes[tileType]?.traversable;

            const nextPosition = getNearestAllowablePosition(game.currentPosition, position, tiles, game.characterPositions) ?? game.currentPosition;

            if (isTraversable) {
              // TODO: Renable this if you want to add energy system
              // momo.modifyEnergy(-3);

              setGame((state) => ({
                ...state,
                ...momo.serialize(state),
                // currentPosition: position,
                previousPosition: state.currentPosition,
                currentPosition: nextPosition,
              }));
            }
          }}
        />
      )}
    </PreloadAssets>
  );
}
