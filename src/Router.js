import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import { PrivateRoute } from './common/components/PrivateRoute';
import LoginContainer from './common/features/Authentication/LoginContainer';
import UsuariosContainer from './common/features/Usuarios/UsuariosContainer';
import ClientesContainer from './common/features/Clientes/ClientesContainer';
import RequisicionesContainer from './common/features/Requisiciones/RequisicionesContainer';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={App} />
      <Switch>
        <PrivateRoute path="/usuarios" component={UsuariosContainer} />
        <PrivateRoute path="/clientes" component={ClientesContainer} />
        <PrivateRoute
          path="/requisiciones"
          component={RequisicionesContainer}
        />
        <Route path="/login" component={LoginContainer} />
        <Redirect path="/" to="/clientes" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
