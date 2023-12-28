import { useEffect } from 'react';

const useScrollToBottom = () => {
  useEffect(() => {
    const scrollToBottom = () => {
      // Scroll to the bottom with smooth animation
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };

    // Attach the scrollToBottom function to an event or call it directly
    // For example, you can call it when a button is clicked or when a certain condition is met
    // For this example, it will be called immediately when the component using this hook mounts

    scrollToBottom();

    // Clean up event listeners or any other cleanup logic if needed
    return () => {
      // Cleanup logic if necessary
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts
};

export default useScrollToBottom;
