import { TileType, tileAttributes } from "./tiles";

const MAX_TILES_PER_MOVE = 3;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/**
 * Given a current set of coordinates and target coordinates, determine the farthest point we can reach by traveling in a straight line,
 * until we reach a tile that is not traversable or inhabited by another character.
 */
export default function getNearestAllowablePosition(
  current: [number,number],
  target: [number, number],
  // eslint-disable-next-line
  tiles: TileType[][],
  // eslint-disable-next-line
  characterMap: Record<string, string>): [number, number] | null { 

  console.info(`Starting at ${current.join(',')}. Target: ${target.join(',')}`);

  // Distance from the player
  const distanceX = clamp(target[0] - current[0], -MAX_TILES_PER_MOVE, MAX_TILES_PER_MOVE);
  const distanceY = clamp(target[1] - current[1], -MAX_TILES_PER_MOVE, MAX_TILES_PER_MOVE);
  const totalDistance = Math.abs(distanceX) + Math.abs(distanceY);

  let closestAllowablePosition: [number, number] = [...current];
  const newCurrent: [number, number] = [...current];

  for (let i=0; i<=totalDistance; i++) {
    const [x, y] = newCurrent;
    const tileType = tiles?.[x]?.[y];
    const isTraversable = tileType != null && tileAttributes[tileType].traversable;

    // No luck yet, but we're getting closer
    if (isTraversable) {
      console.log(`Swinging by ${x}, ${y}`);
      
      closestAllowablePosition = [x, y];
      const directionX = newCurrent[0] === target[0] ? 0 : (newCurrent[0] > target[0] ? -1 : 1);
      const directionY = newCurrent[1] === target[1] ? 0 : (newCurrent[1] > target[1] ? -1 : 1);

      newCurrent[0]+= directionX;
      newCurrent[1]+= directionY;
    } else {
      break;
    }
  }

  console.info(`Stopping at ${closestAllowablePosition.join(',')}`);
  return closestAllowablePosition;
}
