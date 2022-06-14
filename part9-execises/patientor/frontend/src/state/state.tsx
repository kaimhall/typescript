import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";
import { Action } from "./reducer";

//state typing
export type State = {
  patients: { [id: string]: Patient };
  checkedPatients: { [id: string]: Patient };
};

//start up state
const initialState: State = {
  patients: {},
  checkedPatients: {},
};

//creation of state
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

//provider props typing
type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

//state providerto go around child elements
export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
