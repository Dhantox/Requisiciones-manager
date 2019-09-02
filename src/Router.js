import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import MainScreenContainer from './common/features/MainScreen/MainScreenContainer';
import ProjectsContainer from './common/features/Projects/ProjectsContainer';
import { PrivateRoute } from './common/components/PrivateRoute';
import LoginContainer from './common/features/Authentication/LoginContainer';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={App} />
      <Switch>
        <PrivateRoute path="/projects" component={ProjectsContainer} />
        <PrivateRoute path="/timer" component={MainScreenContainer} />
        <Route path="/login" component={LoginContainer} />
        <Redirect path="/" to="/timer" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
