import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { store } from "./index";
import { loadStripe } from "@stripe/stripe-js";
export const history = createBrowserHistory();
export const stripePromise = loadStripe("pk_test_jfLyoEJul7aOrRH8xCH6jzUa005KBxRk3V");
function App() {
  return (
    <div className="App" style={{ height: "100vh", width: "100%" }}>
      <Router history={history}>
        <ConnectedRouter history={history}>
          <>
            <Route path="/home" exact component={Home} />
            <Route
              exact
              path="/"
              render={() =>
                store.getState().auth.isUserLoggedIn ? (
                  <Redirect to="/home" />
                ) : (
                  <Redirect to="/signin" />
                )
              }
            />
            <Route
              path="/signin"
              render={() => (store.getState().auth.isUserLoggedIn ? <Home /> : <SignIn />)}
            />
            <Route
              path="/signup"
              render={() => (store.getState().auth.isUserLoggedIn ? <Home /> : <SignUp />)}
            />
          </>
        </ConnectedRouter>
      </Router>
    </div>
  );
}

export default App;
