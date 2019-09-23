import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import { PrivateRoute } from './common/components/PrivateRoute';
import LoginContainer from './common/features/Authentication/LoginContainer';
import UsuariosContainer from './common/features/Usuarios/UsuariosContainer';
import ClientesContainer from './common/features/Clientes/ClientesContainer';
import RequisicionesContainer from './common/features/Requisiciones/RequisicionesContainer';
import ProveedoresContainer from './common/features/Proveedores/ProveedoresContainer';
import ComprasContainer from './common/features/Compras/ComprasContainer';
import ReportesContainer from './common/features/Reportes/ReportesContainer';

const Router = () => {
  return (
    <BrowserRouter>
      <Route path="/main" component={App} />
      <Switch>
        <PrivateRoute path="/main/usuarios" component={UsuariosContainer} />
        <PrivateRoute path="/main/clientes" component={ClientesContainer} />
        <PrivateRoute
          path="/main/proveedores"
          component={ProveedoresContainer}
        />
        <PrivateRoute
          path="/main/requisiciones"
          component={RequisicionesContainer}
        />
        <PrivateRoute path="/main/Compras" component={ComprasContainer} />
        <PrivateRoute path="/main/Reportes" component={ReportesContainer} />
        <Route path="/login" component={LoginContainer} />
        <Redirect path="/" to="/main/requisiciones" />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
