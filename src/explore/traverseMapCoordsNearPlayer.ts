import { TileType } from "../explore/tiles";

const MAX_DISTANCE_FROM_PLAYER = 10;

// TODO: Refactor to traverse iteratively
const traverseMapCoordsNearPlayer = (
  playerPosition: number[],
  targetPosition: number[],
  callback: (mapPosition: [number, number], tileType: TileType) => void,
  tiles: string[][],
  visited: {
    [key: string]: boolean;
  } = {},
) => {
  const visitedKey = `${targetPosition[0]},${targetPosition[1]}`;
  const isOutOfBounds = tiles[targetPosition[0]]?.[targetPosition[1]] == null;

  if (
    visited[visitedKey] ||
    Math.abs(targetPosition[0] - playerPosition[0]) >
      MAX_DISTANCE_FROM_PLAYER ||
    Math.abs(targetPosition[1] - playerPosition[1]) >
      MAX_DISTANCE_FROM_PLAYER ||
    isOutOfBounds
  ) {
    return;
  }
  visited[visitedKey] = true;
  const tileType = tiles[targetPosition[0]][targetPosition[1]] as TileType;

  callback([targetPosition[0], targetPosition[1]], tileType);

  // Up
  traverseMapCoordsNearPlayer(
    playerPosition,
    [targetPosition[0] - 1, targetPosition[1]],
    callback,
    tiles,
    visited,
  );

  // Down
  traverseMapCoordsNearPlayer(
    playerPosition,
    [targetPosition[0] + 1, targetPosition[1]],
    callback,
    tiles,
    visited,
  );

  // Left
  traverseMapCoordsNearPlayer(
    playerPosition,
    [targetPosition[0], targetPosition[1] - 1],
    callback,
    tiles,
    visited,
  );

  // Right
  traverseMapCoordsNearPlayer(
    playerPosition,
    [targetPosition[0], targetPosition[1] + 1],
    callback,
    tiles,
    visited,
  );
};

export default traverseMapCoordsNearPlayer;
