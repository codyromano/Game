import React, { useRef, useEffect } from "react";

import useClickCoords from "./useClickCoords";

// Define the props type for the component
type MapProps = {
  images: Record<string, HTMLImageElement>;
  tiles: string[][]; // A 2D array of strings: grass, road or forest
  centerPosition: number[]; // A 2D array of numbers representing a position in tiles
  characterPositions: Record<string, string>;
  onSelectTile: (position: [number, number]) => void;
};

// Define the tile size
export const tileSize = 80;

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
) => {
  // const [row, col] = centerPosition;
  const visitedKey = `${target[0]},${target[1]}`;
  const distanceX = target[0] - current[0];
  const distanceY = target[1] - current[1];
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

  const character = characterPositions[`${target[0]},${target[1]}`];

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
  );
};

// Define the component as a functional component
const Map: React.FC<MapProps> = ({
  images,
  tiles,
  centerPosition,
  characterPositions,
  onSelectTile,
}) => {
  const animationFrameIdRef = useRef<number>(0);

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

    drawSurroundingTile(
      ctx,
      [centerX, centerY],
      images,
      tiles,
      centerPosition,
      centerPosition,
      characterPositions,
      {},
    );

    ctx.drawImage(
      images.momo,
      centerX,
      centerY,

      tileSize,
      tileSize,
    );
  };

  // Use useEffect hook to draw on the canvas when the component mounts or updates
  useEffect(() => {
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
