import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Auth } from '../../agent';

export const PrivateRoute = props => {
  const isAuthenticated = useSelector(
    state => state.authenticationReducer.isAuthenticated
  );
  let componentToRender = <Route {...props} />;
  if (!isAuthenticated) {
    if (!Auth.hasCookies()) {
      componentToRender = <Redirect to="/login" />;
    } else {
      Auth.configHeaders();
    }
  }
  return componentToRender;
};

export default PrivateRoute;
