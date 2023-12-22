import { useRef /* useEffect, useCallback*/ } from "react";

interface AnimatedCoordinates {
  x: number;
  y: number;
}

interface AnimatedCoordinatesOptions {
  duration: number;
}

interface AnimatedCoordinatesHook extends AnimatedCoordinates {
  setCoordinates: (newX: number, newY: number) => void;
}

const useAnimatedCoordinates = (
  initialCoordinates: AnimatedCoordinates,
  // eslint-disable-next-line
  options: AnimatedCoordinatesOptions,
): AnimatedCoordinatesHook => {
  const coordRef = useRef<AnimatedCoordinates>(initialCoordinates);

  /*
  const animateCoordinates = useCallback(
    (newX: number, newY: number) => {
      const startTime = Date.now();

      const updateCoordinates = () => {
        const currentTime = Date.now();
        const progress = (currentTime - startTime) / options.duration;

        if (progress < 1) {
          setCoordinates({
            x: initialCoordinates.x + (newX - initialCoordinates.x) * progress,
            y: initialCoordinates.y + (newY - initialCoordinates.y) * progress,
          });

          requestAnimationFrame(updateCoordinates);
        } else {
          setCoordinates({ x: newX, y: newY });
        }
      };

      requestAnimationFrame(updateCoordinates);
    },
    [initialCoordinates.x, initialCoordinates.y, options.duration],
  );
*/
  /*
  useEffect(() => {
    setCoordinates(initialCoordinates);
  }, [initialCoordinates]);
  */

  return {
    x: coordRef.current.x,
    y: coordRef.current.y,
    setCoordinates: (x: number, y: number) => {
      coordRef.current.x = x;
      coordRef.current.y = y;
    },
  };
};

export default useAnimatedCoordinates;
