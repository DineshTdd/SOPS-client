import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import authReducer from "./store/reducers/auth";
import { history } from "./App";

const rootReducer = (History) =>
  combineReducers({
    router: connectRouter(History),
    auth: authReducer,
  });
export const store = createStore(
  rootReducer(history),
  applyMiddleware(routerMiddleware(history), ReduxThunk)
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
