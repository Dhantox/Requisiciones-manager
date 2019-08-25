import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import MainScreenContainer from './common/features/MainScreen/MainScreenContainer';
import ProjectsContainer from './common/features/Projects/ProjectsContainer';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={App} />
      <Switch>
        <Route path="/projects" component={ProjectsContainer} />
        <Route path="/timer" component={MainScreenContainer} />
        <Redirect path="/" to="/timer" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
