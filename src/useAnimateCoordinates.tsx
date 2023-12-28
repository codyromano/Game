import {useEffect, useRef, useCallback } from 'react';

interface AnimatedCoordinates {
  x: number;
  y: number;
}

const useAnimatedCoordinates = (initialX: number, initialY: number, time: number): AnimatedCoordinates => {
  const animatedCoordinatesRef = useRef<AnimatedCoordinates>({
    x: initialX,
    y: initialY,
  });

  const animationFrameRef = useRef<number>();

  // console.log(`player position: ${initialX}, ${initialY}`);

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);  
    }
  };

  const animate = useCallback(
    (startTime: number) => {
      const progress = Math.min(1, (Date.now() - startTime) / time);

      animatedCoordinatesRef.current = {
        x: animatedCoordinatesRef.current.x + (initialX - animatedCoordinatesRef.current.x) * progress,
        y: animatedCoordinatesRef.current.y + (initialY - animatedCoordinatesRef.current.y) * progress,
      };

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(() => animate(startTime));
      }
    },
    [initialX, initialY, time]
  );

  useEffect(() => {
    cleanup();

    const startTime = Date.now();
    animationFrameRef.current = requestAnimationFrame(() => animate(startTime));
    return cleanup;
  }, [initialX, initialY]);

  return animatedCoordinatesRef.current;
};

export default useAnimatedCoordinates;
