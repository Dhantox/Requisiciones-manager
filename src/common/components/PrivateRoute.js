import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Auth } from '../../agent';

export const PrivateRoute = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    state => state.authenticationReducer.isAuthenticated
  );
  let componentToRender = <Route {...props} />;
  if (!isAuthenticated) {
    if (!Auth.hasCookies()) {
      componentToRender = <Redirect to="/login" />;
    } else {
      Auth.configHeaders();
      const user = Auth.loadUser();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
  }
  return componentToRender;
};

export default PrivateRoute;
