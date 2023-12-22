import PreloadAssets from "./PreloadAssets";
import tiles, { tileAttributes } from "./tiles";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import Map from "./Map2";
import { momo } from "../characters/MomoCharacter";
import { GameStateContext } from "../GameStateProvider";
// import { momo } from "../characters/MomoCharacter";

export default function MapContainer() {
  const { state: game, setState: setGame } = useContext(GameStateContext);
  // eslint-disable-next-line
  const navigate = useNavigate();

  // Navigate to battle sequence if we land on a tile w/ a character
  useEffect(() => {
    const positionHasCharacter =
      game.characterPositions[game.currentPosition.join(",")];

    // TODO: For now, assume all characters are battle-able. This
    // may not necessary be true.
    if (positionHasCharacter) {
      const [x, y] = game.currentPosition;
      navigate(`/battle/${x}/${y}`);
    }
    if (game.momo.energy === 0) {
      navigate("/cutscene/fainted");
    }
  }, [game.currentPosition, game.momo.energy]);

  return (
    <PreloadAssets>
      {({ images }) => (
        <Map
          images={images}
          tiles={tiles}
          centerPosition={game.currentPosition}
          characterPositions={game.characterPositions}
          onSelectTile={(position) => {
            const tileType = tiles?.[position[0]]?.[position[1]];
            const isTraversable = tileAttributes[tileType]?.traversable;

            if (isTraversable) {
              // TODO: Renable this if you want to add energy system
              // momo.modifyEnergy(-3);

              setGame((state) => ({
                ...state,
                ...momo.serialize(state),
                currentPosition: position,
              }));
            }
          }}
        />
      )}
    </PreloadAssets>
  );
}
