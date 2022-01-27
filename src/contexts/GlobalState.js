import * as React from "react";

const initialState = { locale: "uk-UA" };

// // export the provider to link in the application
// export const GlobalStateProvider = Provider;

// // export the hook
// export default useGlobalState;
export const globalStateContext = React.createContext(initialState);
export const dispatchStateContext = React.createContext(undefined);

const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({ ...state, ...newValue }),
    initialState
  );
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext),
];

export default GlobalStateProvider;
