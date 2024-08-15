import React, { ReactElement, useEffect, useState } from 'react';
import Child1 from './components/Child1';
import Child2Object from './components/Child2';
import { GlobalStateContext } from './context/GlobalStateContext';
import { useCounterHook } from './hooks/useCounterHook';

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// each functional component is a function that needs to run first -> execute all its codes under its block and returns JSX code set -> this jsx code set is what all rendered element on screen
// re-render means the component function will be called again to generate a new JSX code set with new state values, and then update the real DOM to match the new virtual DOM
// outside functional component code will only run once ONLY UPON COMPONENT MOUNTING and does not subject to react re-rendering process to re-execute these codes
// by convention, we must have modifiers ("const" or "let") for each declared variable (if not, then it will be treated as global variable under "window" object no matter where it is declared)
const title: string = 'Parent Component';
const c1Props: { a: number; b: number } = { a: 5555, b: 6666 };
console.log('parent outside runs');

// ---------------------------------------------------------------------------------------------------------------------

function App(): ReactElement {
  console.log('home page runs');

  // any declared states will be persistent and tracked for the lifespan of that component since onMount -> across multiple re-renders until the component is unmounted (very important)
  // by default, the state declared in a React component is local and private to that component. Other components cannot directly access or modify this state.
  // but state can be shared through props / context | as we learned, state sharing is always DOWNWARDS (not upwards) to child components as props (very important)
  // "the concept of lifting state up" is to pass setState function DOWN to child component as props, so that child component can update the state of parent component using its own state by calling it
  // The re-rendering is triggered only in the target component where the target state + update function is initially declared within that component, is now being updated through the state update function (very important)
  // child component will always re-render when parent component re-render (no matter state is passed down or not), but parent component will not re-render when child component re-render
  // any state update function should only be called under either event handler or lifecycle hook. CAN NOT CALL directly under component function body to avoid infinite re-render.
  const [parentGlobalState, setParentGlobalState] = useState<number>(11111);
  const { counter, setCounterHandler }: { counter: number; setCounterHandler: () => void } = useCounterHook('parent');

  // during re-rendering, the useState function will not re-initialize the state value, but only return and track the most current state value (very important)
  const [state1, setState1] = useState<number>(333);
  const [state2, setState2] = useState<number>(666);

  // during re-rendering, all the codes under component function will re-run again with latest state values
  function f1<T>(stateinput1: T): void {
    console.log('f1 function runs', stateinput1);
  }
  f1<number>(state1);

  // When a state update function is called and the state is also accessed simultaneously within the same function, the accessed state will always be previous value throughout the function body.
  // note, its always recommended to use functional callback to update state if update depends on previous state value (very important)
  // only the functional callback parameter will always be the latest state value even under the same function call (very important)
  // the state value outside the function will be updated immediately and corresponding after batching however
  function batchUpdateHandler(): void {
    console.log('batch update handler run');

    // update state1 state for first time first
    setState1((pre: number): number => {
      // pre = 333
      console.log('pre1', pre);
      return pre + 1;
    });

    // then access state1, stay as 333 (the old value before calling this function) under the function body
    console.log('state1-1', state1);

    // update state1 state again, but this time, the pre value will be the latest state value (334)
    setState1((pre: number) => {
      // pre = 334
      console.log('pre2', pre);
      return pre + 1;
    });

    // then access the same state again, still stay as 333 (the old value before calling this function) under the function body
    console.log('state1-2', state1);
  }

  // we have tested that all useEffect hooks' callback functions will ONLY RUN AFTER ALL elements + children components are fully rendered under COMPONENT WHERE THEY DECLARED
  // if there are two or more "useEffect" hooks, then all of their callback functions will run IN THE ORDER when they declared (no suprise here)
  useEffect(() => {
    console.log('parent useEffect run1');
  }, []);

  useEffect(() => {
    console.log('parent useEffect run2');
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    // Under context provider, the "value" can be shared, accessed, and used directly by any child component under it WITHOUT NEEDING TO USE "PROPS" TO PASS DOWN through each vertical level
    // the "value" prop here must match with the type annotation we defined previously in context file (very important)
    // the "value" prop here is the shared state value + its update function that we want to share with all child components under this context provider (with updated commits)
    // This is feature-1-branch comments
    <GlobalStateContext.Provider value={{ parentGlobalState, setParentGlobalState }}>
      <div>
        {/* {} are used to call js expression directly into jsx code | the expression return value will auto display on screen from jsx code */}
        <h1>{title}</h1>
        <button onClick={setCounterHandler} style={{ marginRight: '10px' }}>
          add +
        </button>
        <span>count couner state: {counter}</span>
        <div />
        <button onClick={batchUpdateHandler} style={{ marginRight: '10px' }}>
          batch update
        </button>
        <p>state1: {state1}</p>
        <p>state2: {state2}</p>

        <div style={{ display: 'flex', marginTop: '50px' }}>
          {/* when we call react functional component, we have to use <> syntax, but not () | param/prop assignment style is "key = {value}" pattern + without comma */}
          {/* as tested, besides any string, any other data type when assign to prop MUST WRAP UNDER {} */}
          {/* all the param/prop assignment following this pattern will condense into a single object (very important) */}
          {/* all child component will auto gain access to context value without using props at all WHEN THEY ARE WRAPPED UNDER TARGET CONTEXT PROVIDER COMPONENT */}
          {/* for "children" props (special reserved props name), we can directly pass value in-between tags (again, for any value other than string, we have use {}) */}
          <Child1 c='dsd' {...c1Props} d={3}>
            <h2>this is children lol</h2>
          </Child1>
          {/* we can also wrap the functional component under js object and use in this way */}
          <Child2Object.Child2 />
        </div>
      </div>
    </GlobalStateContext.Provider>
  );
}

export default App;
