import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import { Container } from 'semantic-ui-react';
import MainScreenContainer from './common/features/MainScreen/MainScreenContainer';
import CurrencyExchangeDetailsContainer from './common/features/CurrencyExchangeDetails/CurrencyExchangeDetailsContainer';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={App} />
      <Container>
        <Switch>
          <Route
            path="/currency-exchanges/:currencyExchangeId"
            component={CurrencyExchangeDetailsContainer}
          />
          <Route path="/currency-exchanges" component={MainScreenContainer} />
          <Redirect path="/" to="/currency-exchanges" />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

const HOME = '/currency-exchanges';
export default Router;
export { HOME };
