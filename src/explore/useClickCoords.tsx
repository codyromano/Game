import React, { useEffect } from "react";

// Define the type for the callback function
type ClickCallback = (x: number, y: number) => void;

// Define the hook as a function that takes a ref and a callback as parameters
const useClickCoords = (
  ref: React.RefObject<HTMLElement>,
  callback: ClickCallback,
) => {
  // Define a handler function that gets the click coordinates and calls the callback
  const handleClick = (event: MouseEvent) => {
    // Get the x and y coordinates of the click relative to the element
    const x = event.clientX - (ref.current?.offsetLeft || 0);
    const y = event.clientY - (ref.current?.offsetTop || 0);
    // Call the callback with the coordinates
    callback(x, y);
  };

  // Use useEffect hook to add and remove the click event listener on the element
  useEffect(() => {
    // Get the element from the ref
    const element = ref.current;
    if (element) {
      // Add the click event listener
      element.addEventListener("click", handleClick);
      // Return a cleanup function that removes the event listener
      return () => {
        element.removeEventListener("click", handleClick);
      };
    }
  }, [ref, callback]); // Re-run the effect if the ref or the callback changes

  // Return nothing since the hook does not need to expose anything
};

export default useClickCoords;
