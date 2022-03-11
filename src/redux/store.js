import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import reducer from "./reducer";

const composeEnhancers = composeWithDevTools({ name: `Freckled's Blog` });

const store = (preloadedState) => {
  return createStore(
    reducer,
    getLoadedState(preloadedState),
    composeWithDevTools(applyMiddleware())
  );
};

const getLoadedState = (preloadedState) => {
  return {
    ...preloadedState,
  };
};

export default store;
