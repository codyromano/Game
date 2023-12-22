import { useEffect, useRef, useState } from "react";

interface ComputedStyles {
  [key: string]: string;
}

const useComputedStyles = (): {
  computedStyles: ComputedStyles;
  elementRef: React.RefObject<HTMLElement>;
} => {
  const [computedStyles, setComputedStyles] = useState<ComputedStyles>({});
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateComputedStyles = () => {
      if (elementRef.current) {
        const styles = window.getComputedStyle(elementRef.current);
        const computedStylesObject: ComputedStyles = {};

        for (let i = 0; i < styles.length; i++) {
          const propertyName = styles[i];
          const propertyValue = styles.getPropertyValue(propertyName);
          computedStylesObject[propertyName] = propertyValue;
        }

        setComputedStyles(computedStylesObject);
      }
    };

    updateComputedStyles();
  }, [elementRef]); // Empty dependency array ensures that the effect runs only once after the initial render

  return { computedStyles, elementRef };
};

export default useComputedStyles;
