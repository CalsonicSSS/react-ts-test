import React, { ReactElement, useContext } from "react";
import { GlobalStateContext } from "../context/GlobalStateContext";
import { useCounterHook } from "../hooks/useCounterHook";

function Child2(): ReactElement {
  const sharedContext: null | { parentGlobalState: number; setParentGlobalState: React.Dispatch<React.SetStateAction<number>> } = useContext(GlobalStateContext);

  const { counter, setCounterHandler } = useCounterHook("Child2");

  return (
    <div>
      <h1>Child2 Compoent</h1>
      <button onClick={setCounterHandler} style={{ marginRight: "10px" }}>
        add +
      </button>
      <span>count state: {counter}</span>
      <h3>context shared state: {sharedContext?.parentGlobalState}</h3>
      <button
        onClick={() => {
          sharedContext?.setParentGlobalState(11111);
        }}
      >
        change global context state
      </button>
    </div>
  );
}

const Child2Object = {
  Child2,
};

export default Child2Object;
