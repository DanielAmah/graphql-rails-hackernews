import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import React from "react";
import { Route, Redirect, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
// import logo from './logo.svg'
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./App.css";
import { isAuthenticated } from "./helpers/authentication";
import configureStore from "./store";

const store = configureStore({});

function AppRoute() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <ReduxToastr timeOut={3000} preventDuplicates progressBar />
          <Switch>
            <Route
              path="/login"
              exact
              render={props =>
                !isAuthenticated(props) ? (
                  <Login {...props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/"
              exact
              render={props =>
                isAuthenticated(props) ? (
                  <Home {...props} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route exact path="/register" component={Register} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default AppRoute;
