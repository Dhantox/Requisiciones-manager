import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import MainContainerLogin from './MainContainerLogin';
import { getIsAuthenticated } from './authenticationSelectors';
import { Auth } from '../../../agent';

const LoginContainer = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();
  return (
    <MainContainerLogin title="Login">
      {isAuthenticated ? (
        <Redirect to="/"></Redirect>
      ) : (
        <Login
          onSuccess={credentials =>
            Auth.login(credentials)
              .then(r => {
                Auth.configCookies(r.data.credentials);
                Auth.configHeaders();
                Auth.saveUser(r.data.user_data);
                dispatch({ type: 'LOGIN_SUCCESS', payload: r.data.user_data });
              })
              .catch(e => console.log('Error login'))
          }
        ></Login>
      )}
    </MainContainerLogin>
  );
};

export default LoginContainer;
