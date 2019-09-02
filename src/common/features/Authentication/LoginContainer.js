import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import MainContainer from '../../components/MainContainer';
import { getIsAuthenticated } from './authenticationSelectors';

const LoginContainer = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();
  return (
    <MainContainer title="Login">
      {isAuthenticated ? (
        <Redirect to="/"></Redirect>
      ) : (
        <Login onSuccess={() => dispatch({ type: 'LOGIN_SUCCESS' })}></Login>
      )}
    </MainContainer>
  );
};

export default LoginContainer;
