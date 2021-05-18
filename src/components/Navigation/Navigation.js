import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './../Login/Login.js';
import Dashboard from './../Dashboard/Dashboard.js';
import Play from './../Play/Play.js';
import classes from './Navigation.module.css';

export default function Navigation() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <h1 className={classes.NavigationHead}> Welcome to Minesweeper </h1>
          </Route>
          <Route path="/SignIn">
            <Login />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          <Route path="/Top10">
            <Dashboard />
          </Route>
          <Route path="/Play">
            <Play />
          </Route>
        </Switch>
    </Router>
  );
}
