/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";

import AboutPage from "./AboutPage";
import FuelSavingsPage from "./containers/FuelSavingsPage";
import addTaskPage from "./containers/addTaskPage";
import addMemberPage from "./containers/addMemberPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div>
        <div>
          {/* <div style={
            {
              display:"flex",
              flexDirection:"row",
              alignItems:"center",
              justifyContent:"center",
              border: "1px solid #1878d0",
              padding: "5px",
              borderRadius: "5px"
            }
          }>
            <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
            {' | '}
            <NavLink to="/tasks" activeStyle={activeStyle}>Add Task</NavLink>
            {' | '}
            <NavLink to="/members" activeStyle={activeStyle}>Add Member</NavLink>
          </div> */}
        </div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/tasks" component={addTaskPage} />
          <Route path="/members" component={addMemberPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
