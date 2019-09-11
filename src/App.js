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
    <div class="ui vertical borderless fluid text menu" className={styles.navBarContainer}>
    <div class="sidebar">
      <h4></h4>
    </div>
      <div className={styles.navBar}>
        <div
          class="fontcolor"
          className={`${
            location === '/requisiciones' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="requisiciones">
            <div class="ui grid">
              <div class="two wide column">
              <Icon name="file alternate outline" size="large"/>
              </div>
              <div class="two wide column">
              <h5 >Requisiciones</h5>
              </div>
            </div>
          </Link>
        </div>
        <div
          className={`${
            location === '/usuarios' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="usuarios">
          <div class="ui grid">
              <div class="two wide column">
              <Icon name="user" size="large" colored='white'/>
              </div>
              <div class="two wide column">
              <h5 >Usuarios</h5>
              </div>
            </div>
          </Link>
        </div>
        <div
          className={`${
            location === '/clientes' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="clientes">
          <div class="ui grid">
              <div class="two wide column">
              <Icon name="users" size="large" colored='white'/>
              </div>
              <div class="two wide column">
              <h5>Clientes</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </body>
  );
};
