import { useEffect, useState } from "react";

// when you declare a state using the useState hook that state will be persistent and tracked for the lifespan of that component.
// Once the component is unmounted, the state associated with that component will be destroyed and will no longer exist. It will be back to initial state value once it is onmounted again
// all the states/logics written under the customized hooks ARE LOCAL TO THE COMPONENT WHERE THE HOOK IS CALLED LATER
// if "useEffect" is also called under the customized hooks, it STILL FOLLOWS THE RULE OF "RUN AFTER ALL ELEMENTS AND CHILD COMPONENTS ARE RENDERED" UNDER THE TARGET COMPONENT WHERE THE
// CUSTOMIZED HOOK IS CALLED.
// react "re-rendering" will ONLY trigger the TARGET COMPONENT where that state variable IS ORIGINALLY DECLARED to re-render (First) + any child components that is under the target component.

export function useCounterHook(componentTitle: string): { counter: number; setCounterHandler: () => void } {
  console.log(`${componentTitle} useCounterHook run`);

  const [counter, setCounter] = useState<number>(1);

  function setCounterHandler(): void {
    setCounter((preState: number): number => {
      return preState + 1;
    });
  }

  useEffect(() => {
    console.log(`${componentTitle} useCounterHook's useEffect run`);
  }, []);

  return { counter, setCounterHandler };
}
