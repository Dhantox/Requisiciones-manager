import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import { Container } from 'semantic-ui-react';
import MainScreenContainer from './common/features/MainScreen/MainScreenContainer';
import ProjectsContainer from './common/features/Projects/ProjectsContainer';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={App} />
      <Container>
        <Switch>
          <Route path="/projects" component={ProjectsContainer} />
          <Route path="/timer" component={MainScreenContainer} />
          <Redirect path="/" to="/timer" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default Router;
