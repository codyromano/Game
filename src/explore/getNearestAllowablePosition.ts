import { TileType, tileAttributes } from "./tiles";

const getDistanceScore = (current: [number,number], target: [number, number]): number => {
  return Math.abs(current[0] - target[0]) + Math.abs(current[1] - target[1]);
};

/**
 * Given a current set of coordinates and target coordinates, determine the farthest point we can reach by traveling in a straight line,
 * until we reach a tile that is not traversable or inhabited by another character.
 */
export default function getNearestAllowablePosition(
  current: [number,number], target: [number, number],
  tiles: TileType[][],
  characterMap: Record<string, string>): [number, number] | null {  
  // All the coordinates along the route to the target destination (straight line)
  const coordsOnRoute: Array<{
    current: [number, number],
    direction: [number, number]
  }> = [
    // Up
    {current, direction: [-1, 0]},
    // Down
    {current, direction: [1, 0]},
    // Left
    {current, direction: [0, -1]},
    // Right
    {current, direction: [0, 1]},
    // Diagonal - Up, left
    {current, direction: [-1, -1]},
    // Diagonal - Up, right
    {current, direction: [-1, 1]},
    // Diagonal - Down, left 
    {current, direction: [1, -1]},
    // Diagonal - Down, right 
    {current, direction: [1, 1]}
  ];

  let shortestDistance = Infinity;
  let bestCoords: [number, number] | null = null;

  while (coordsOnRoute.length) {
    const coords = coordsOnRoute.pop();

    if (coords == null) {
      return null;
    }

    // We've reached the target destination
    if (coords.current[0] === target[0] && coords.current[1] === target[1]) {
      return coords.current;
    }

    // If we've reached a non-traversable tile, return the closest traversable 
    // tile previously encountered or null if no such tile exists
    const tileType: TileType | null = tiles?.[coords.current[0]]?.[coords.current[1]];

    // Tile is out of bounds or not traversable 
    if (tileType == null || !tileAttributes[tileType].traversable) {
      continue;
    }

    const tileHasCharacter = characterMap[`${coords.current[0]},${coords.current[1]}`] != null;
    const isCharacterAdjacent = Math.abs(current[0] - target[0]) === 1 || Math.abs(current[1] - target[1]);

    if (tileHasCharacter) {
      // Allow moving to a tile w/ a character if the player is directly adjacent to the tile
      if (isCharacterAdjacent) {
        return target;
      }
      // Otherwise return the open tile closest to this character along the route 
      // This is to avoid unwanted character interactions
      continue;
    }

    if (tileHasCharacter && isCharacterAdjacent) {
      return target;
    }

    const score = getDistanceScore(coords.current, target);
    if (score < shortestDistance) {
      shortestDistance = score;
      bestCoords = coords.current;
    }

    coordsOnRoute.push({current: [coords.current[0] + coords.direction[0], coords.current[1] + coords.direction[1]], direction: coords.direction});
  }

  return bestCoords;
}
