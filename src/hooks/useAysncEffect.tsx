import { useEffect } from "react";

/**
 * A custom hook to handle asynchronous logic in a useEffect-like manner.
 * @param effect Async function to execute
 * @param deps Dependency array to control when the effect re-runs
 */
export const useAsyncEffect = (
  effect: () => Promise<void> | void,
  deps: React.DependencyList
) => {
  useEffect(() => {
    const runEffect = async () => {
      try {
        await effect();
      } catch (error) {
        console.error("Error in useAsyncEffect:", error);
      }
    };

    runEffect();
  }, deps);
};
