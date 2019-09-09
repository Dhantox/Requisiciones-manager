import React from 'react';
import { Loader } from 'semantic-ui-react';
import './App.css';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styles from './app.module.css';

export default props => {
  let location = props.history.location.pathname;
  return (
    <body>
    <div class="sidebar">
      <h4></h4>
    </div>
    <div className={styles.navBarContainer}>
      <div className={styles.navBar}>
      <div className={styles.item}>
          Menu
          </div>
        <div
          className={`${
            location === '/requisiciones' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="requisiciones">
            Requisiciones
          </Link>
        </div>
        <div
          className={`${
            location === '/usuarios' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="usuarios">
            Usuarios
          </Link>
        </div>
        <div
          className={`${
            location === '/clientes' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="clientes">
            Clientes
          </Link>
        </div>
        <div
          className={`${
            location === '/requisiciones' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="requisiciones">
            <Icon name="envelope outline" size="big" />
          </Link>
        </div>
      </div>
    </div>
    </body>
  );
};
