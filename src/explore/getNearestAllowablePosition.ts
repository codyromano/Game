import { TileType, tileAttributes } from "./tiles";

/**
 * Given a current set of coordinates and target coordinates, determine the farthest point we can reach by traveling in a straight line,
 * until we reach a tile that is not traversable or inhabited by another character.
 */
export default function getNearestAllowablePosition(current: [number,number], target: [number, number], tiles: TileType[][], characterMap: Record<string, string>): [number, number] | null {  
  // All the coordinates along the route to the target destination (straight line)
  const coordsOnRoute: Array<[number, number]> = [current];
  let previousCoords: [number, number] | null = null;

  const directionX = Math.min(1, Math.max(-1, target[0] - current[0]));
  const directionY = Math.min(1, Math.max(-1, target[1] - current[1]));

  const visited: Record<string, boolean> = {};

  while (coordsOnRoute.length) {
    const coords = coordsOnRoute.pop();

    if (coords == null) {
      return null;
    }

    const memoKey = `${coords.join(',')}`;

    if (visited[memoKey]) {
      continue;
    }

    visited[memoKey] = true;

    // We've reached the target destination
    if (coords[0] === target[0] && coords[1] === target[1]) {
      return coords;
    }

    // If we've reached a non-traversable tile, return the closest traversable 
    // tile previously encountered or null if no such tile exists
    const tileType: TileType | null = tiles?.[coords[0]]?.[coords[1]];

    // Tile is out of bounds or not traversable 
    if (tileType == null || !tileAttributes[tileType].traversable) {
      continue;
      // return previousCoords; 
    }

    const tileHasCharacter = characterMap[`${coords[0]},${coords[1]}`] != null;
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

    coordsOnRoute.push([coords[0] + directionX, coords[1] + directionY]);
    coordsOnRoute.push([coords[0], coords[1] + directionY]);
    coordsOnRoute.push([coords[0] + directionX, coords[1]]);

    previousCoords = coords; 
  }

  return previousCoords;
}