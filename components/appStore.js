import { useReducer, useContext, createContext } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "updateStore":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, 0);
  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
export const useDispatchAppState = () => useContext(AppDispatchContext);
