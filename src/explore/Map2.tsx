import React, { useRef, useEffect, useState, useMemo } from "react";

import useClickCoords from "./useClickCoords";
import { GameState } from "../GameStateProvider";
import ItemFactory from "../items/ItemFactory";
//import useAnimatedCoordinates from "../useAnimateCoordinates";

// Define the props type for the component
type MapProps = {
  images: Record<string, HTMLImageElement>;
  tiles: string[][]; // A 2D array of strings: grass, road or forest
  centerPosition: number[]; // A 2D array of numbers representing a position in tiles
  characterPositions: Record<string, string>;
  items: GameState["items"];
  onSelectTile: (position: [number, number]) => void;
};

// Define the tile size
// export const tileSize = 80;
export const tileSize = 60;

const MAX_RECURSIVE_DRAW_DEPTH = 10;

// Recursively draw tiles surrounding the player

const drawSurroundingTile = (
  ctx: CanvasRenderingContext2D,
  centerPosition: number[],
  images: Record<string, HTMLImageElement>,
  tiles: string[][],
  target: number[],
  current: number[],
  characterPositions: Record<string, string>,
  visited: {
    [key: string]: boolean;
  },
  items?: GameState["items"],
  // eslint-disable-next-line
  animationContext?: { x: number; y: number },
) => {
  // const [row, col] = centerPosition;
  const visitedKey = `${target[0]},${target[1]}`;

  const distanceX = target[0] - current[0];
  const distanceY = target[1] - current[1];
  // const distanceX = target[0] - (animationContext?.x ?? 0);
  // const distanceY = target[1] - (animationContext?.y ?? 0)

  if (animationContext?.x != current[0] && animationContext?.x != null) {
    // console.log(animationContext?.x);
  }

  const isOutOfBounds = tiles[target[0]]?.[target[1]] == null;

  if (
    visited[visitedKey] ||
    Math.abs(target[0] - current[0]) > MAX_RECURSIVE_DRAW_DEPTH ||
    Math.abs(target[1] - current[1]) > MAX_RECURSIVE_DRAW_DEPTH ||
    isOutOfBounds
  ) {
    return;
  }
  visited[visitedKey] = true;
  const tileType = tiles[target[0]][target[1]];

  if (images[tileType] == null) {
    throw new Error(`No image has been defined for tile ${tileType}`);
  }

  ctx.drawImage(
    images[tileType],
    centerPosition[0] + distanceY * tileSize,
    centerPosition[1] + distanceX * tileSize,
    tileSize,
    tileSize,
  );

  const positionKey = `${target[0]},${target[1]}`;
  const character = characterPositions[positionKey];
  const item = items?.[positionKey];

  if (character != null) {
    if (images[character] == null) {
      throw new Error(`No image has been defined for character ${character}`);
    }
    ctx.drawImage(
      images[character],
      centerPosition[0] + distanceY * tileSize,
      centerPosition[1] + distanceX * tileSize,
      tileSize,
      tileSize,
    );
  }

  if (item != null) {
    const itemObject = ItemFactory.create(item);

    if (images[itemObject.itemName] == null) {
      throw new Error(
        `No image has been defined for item ${itemObject.itemName}`,
      );
    }
    ctx.drawImage(
      images[itemObject.itemName],
      centerPosition[0] + distanceY * tileSize,
      centerPosition[1] + distanceX * tileSize,
      tileSize,
      tileSize,
    );
  }

  // Up
  drawSurroundingTile(
    ctx,
    centerPosition,
    images,
    tiles,
    [target[0] - 1, target[1]],
    current,
    characterPositions,
    visited,
    items,
    animationContext,
  );

  // Down
  drawSurroundingTile(
    ctx,
    centerPosition,
    images,
    tiles,
    [target[0] + 1, target[1]],
    current,
    characterPositions,
    visited,
    items,
    animationContext,
  );

  // Left
  drawSurroundingTile(
    ctx,
    centerPosition,
    images,
    tiles,
    [target[0], target[1] - 1],
    current,
    characterPositions,
    visited,
    items,
    animationContext,
  );

  // Right
  drawSurroundingTile(
    ctx,
    centerPosition,
    images,
    tiles,
    [target[0], target[1] + 1],
    current,
    characterPositions,
    visited,
    items,
    animationContext,
  );
};

function useTimeValueChanged<T>(currentValue: T): {
  previousValue: T;
  timeUpdated: number;
} {
  const [timeValueChanged, setTimeValueChanged] = useState<number>(Date.now());
  const currentValueRef = useRef<T>(currentValue);
  const previousValueRef = useRef<T>(currentValue);

  useEffect(() => {
    if (currentValueRef.current !== currentValue) {
      setTimeValueChanged(Date.now());
      previousValueRef.current = currentValueRef.current;
      currentValueRef.current = currentValue;
    }
  }, [currentValue]);

  return useMemo(
    () => ({
      timeUpdated: timeValueChanged,
      previousValue: previousValueRef.current,
    }),
    [previousValueRef.current, timeValueChanged],
  );
}

// Define the component as a functional component
const Map: React.FC<MapProps> = ({
  images,
  tiles,
  items,
  centerPosition,
  characterPositions,
  onSelectTile,
}) => {
  const animationFrameIdRef = useRef<number>(0);
  const playerPositionAnimatedRef = useRef({
    x: centerPosition[0],
    y: centerPosition[1],
  });
  const timeCenterPositionChanged = useTimeValueChanged(centerPosition);

  // console.log('center position changed at ', timeCenterPositionChanged);

  // const animationContext = useAnimatedCoordinates(centerPosition[0], centerPosition[1], 2000);

  // Create a ref to access the canvas element
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useClickCoords(canvasRef, (x, y) => {
    if (canvasRef?.current != null) {
      const centerX = canvasRef.current.width / 2;
      const centerY = canvasRef.current.height / 2;
      const colOffset = Math.floor((x - centerX) / tileSize);
      const rowOffset = Math.floor((y - centerY) / tileSize);

      onSelectTile([
        centerPosition[0] + rowOffset,
        centerPosition[1] + colOffset,
      ]);
    }
  });

  const renderLoop = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) => {
    // Clear the previous canvas content
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2 - tileSize / 2;
    const centerY = canvas.height / 2 - tileSize / 2;

    const ANIMATION_TIME = 2000;

    const timeSincePlayerPositionUpdated =
      Date.now() - timeCenterPositionChanged.timeUpdated;
    const animationProgress =
      Math.min(ANIMATION_TIME, timeSincePlayerPositionUpdated) / ANIMATION_TIME;

    // Get the distance between the current player position & the target position
    // eslint-disable-next-line
    const [previousX, previousY] = timeCenterPositionChanged.previousValue;

    const distanceX = centerPosition[0] - previousX;
    const distanceY = centerPosition[1] - previousY;

    // console.log(`Need to travel from ${previousX},${previousY} to ${centerPosition.join(',')}, a distance of ${distanceX}, ${distanceY}`);

    // TODO: Adjust based on time of position change
    playerPositionAnimatedRef.current.x =
      previousX + distanceX * animationProgress;
    playerPositionAnimatedRef.current.y =
      previousY + distanceY * animationProgress;

    drawSurroundingTile(
      ctx,
      [centerX, centerY],
      images,
      tiles,
      centerPosition,
      centerPosition,
      characterPositions,
      {},
      items,
      playerPositionAnimatedRef.current,
    );

    ctx.drawImage(
      images.momo,
      centerX,
      centerY,

      tileSize,
      tileSize,
    );

    // TODO: Will this explode stuff
    animationFrameIdRef.current = requestAnimationFrame(() =>
      renderLoop(canvas, ctx),
    );
  };

  // Use useEffect hook to draw on the canvas when the component mounts or updates
  useEffect(() => {
    // Cancel render loops already in progress
    cancelAnimationFrame(animationFrameIdRef.current);

    // Get the canvas element from the ref
    const canvas = canvasRef.current;
    if (canvas) {
      // Get the 2D rendering context from the canvas
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        animationFrameIdRef.current = requestAnimationFrame(() =>
          renderLoop(canvas, ctx),
        );
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [centerPosition]);

  // Return the canvas element with the width and height based on the tiles array and tile size
  // TODO: Use real device dimensions
  return (
    <canvas
      ref={canvasRef}
      height={window.innerHeight}
      width={window.innerWidth}
    />
  );
};

export default Map;
