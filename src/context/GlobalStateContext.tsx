import { Context, createContext } from 'react';

// generic type of "Context" interface MUST BE equal to the generic type of "createContext" function
// such type must also match for context provider's value props and when you access the context value when using "useContext" in components
const GlobalStateContext: Context<null | { parentGlobalState: number; setParentGlobalState: React.Dispatch<React.SetStateAction<number>> }> = createContext<null | {
  parentGlobalState: number;
  setParentGlobalState: React.Dispatch<React.SetStateAction<number>>;
}>(null);

export { GlobalStateContext };
