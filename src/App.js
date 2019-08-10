import React from 'react';
import './App.css';
import NavBar from './common/components/NavBar';
import { HOME } from './Router';

function App(props) {
  return (
    <NavBar
      backButtonVisible={props.history.location.pathname !== HOME}
      backCallback={props.history.goBack}
      rightItems={[
        {
          id: 53,
          name: 'nuevo',
          content: 'algo'
        }
      ]}
      leftItems={[
        {
          id: 3,
          name: 'logout',
          content: 'Logout',
          onClick: props.history.goBack
        }
      ]}
    />
  );
}

export default App;
