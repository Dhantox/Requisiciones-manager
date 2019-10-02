import React from 'react';
import './App.css';
import MainMenu from './common/components/MainMenu';
export default props => {
  if (!localStorage.getItem('stateMenu')) {
    localStorage.setItem('stateMenu', true);
  }
  return (
    <>
      <MainMenu {...props} />
    </>
  );
};
