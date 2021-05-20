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
import Register from './../Register/Register.js';
import SimpleModal from './../Modals/Modals.js';
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
          <Route path="/SignUp">
            <Register />
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
          <Route path="/Win">
            <SimpleModal status="Congratulations" win="Win" />
          </Route>
          <Route path="/Lost">
            <SimpleModal status="Oops... you lost"/>
          </Route>
        </Switch>
    </Router>
  );
}
