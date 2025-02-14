import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-notifications-component/dist/theme.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import * as serviceWorker from './serviceWorker';
import Router from './Router';
import configureStore from './store';

const store = configureStore({});
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
