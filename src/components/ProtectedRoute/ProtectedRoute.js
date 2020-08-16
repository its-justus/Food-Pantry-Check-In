import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import UnauthorizedPage from '../UnauthorizedPage/UnauthorizedPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

const ProtectedRoute = (props) => {
  // Using destructuring, this takes ComponentToProtect from component
  // prop and grabs all other props to pass them along to Route
  const {
    // Alias prop 'component' as 'ComponentToProtect'
    component: ComponentToProtect,
    account,
    login,
    maximumAccessLevel,
    minimumAccessLevel,
    ...otherProps
  } = props;

  let ComponentToShow;
  if (account.access_level < minimumAccessLevel) {
    // If a minimumAccessLevel has been specified then confirm the user who's currently
    // logged in has a sufficient access level and if not show them the unauthorized page.
    ComponentToShow = UnauthorizedPage;
  } else if (account.access_level > maximumAccessLevel) {
    // If a user has a rank higher than 10 (a volunteer or admin) don't let them access
    // the checkin page.
    ComponentToShow = UnauthorizedPage;
  } else if (account.id) {
    // if the user is logged in (only logged in users have ids)
    // show the component that is protected
    ComponentToShow = ComponentToProtect;
  } else if (login === 'login') {
    // if they are not logged in, check the loginMode on Redux State
    // if the mode is 'login', show the LoginPage
    ComponentToShow = LoginPage;
  } else {
    // the user is not logged in and the mode is not 'login'
    // show the RegisterPage
    ComponentToShow = RegisterPage;
  }

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...otherProps}
      component={ComponentToShow}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    login: state.login.loginMode
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
