import {useEffect} from "react";

function useOutsideClick(targetRef, ignoreRef, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      // Do nothing if the click is on the ignored element (e.g., the toggle button)
      if (ignoreRef && ignoreRef.current && ignoreRef.current.contains(event.target)) {
        return;
      }

      // Check if the targetRef is attached and if the click was outside
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        targetRef.current.classList.remove("is-active");
        callback(); // If so, call the function to close the component
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove the event listener when the component unmounts for cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [targetRef, callback, ignoreRef]); // Re-run the effect if any of these changes
}

export default useOutsideClick;