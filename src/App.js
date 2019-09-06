import React from 'react';
import { Loader } from 'semantic-ui-react';
import './App.css';
import NavBar from './common/components/NavBar';

function App(props) {
  return (
    <>
      <Loader active>Cargando</Loader>
      <NavBar {...props} />{' '}
    </>
  );
}

export default App;
