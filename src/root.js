import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import logger from "redux-logger";

import RootReducer from "./reducers/root";

export default ({ children, initialState = {} }) => {
  const store = createStore(RootReducer, initialState, applyMiddleware(logger));
  return <Provider store={store}>{children}</Provider>;
};
