import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "connected-react-router";
import { store } from "./index";
export const history = createBrowserHistory();

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
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
          </>
        </ConnectedRouter>
      </Router>
    </div>
  );
}

export default App;
