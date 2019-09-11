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
    </div >
    <div class="ui vertical borderless fluid text menu" className={styles.navBarContainer}>
      <div className={styles.navBar}>
        <div className={styles.paddingfix}>

    
        <div
          className={`${
            location === '/main/requisiciones' ? styles.selectedItem : styles.item
          } `
        }
        >
          <Link to="requisiciones">
            <div class="ui grid">
              <div class="two wide column">
              <Icon name="file alternate outline" size="large"/>
              </div>
              <div class="two wide column">
              <p>Requisiciones</p>
              </div>
            </div>
          </Link>
        </div>
        </div>
        <div className={styles.paddingfix}>
        <div
          className={`${
            location === '/main/usuarios' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="usuarios">
          <div class="ui grid">
              <div class="two wide column">
              <Icon name="user" size="large" />
              </div>
              <div class="two wide column">
              <p>Usuarios</p>
              </div>
            </div>
          </Link>
        </div> 
        </div>
        <div className={styles.paddingfix}>
        <div

          className={`${
            location === '/main/clientes' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="clientes">
          <div class="ui grid">
              <div class="two wide column">
              <Icon name="users" size="large" />
              </div>
              <div class="two wide column">
              <p>Clientes</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </div>
    </body>
  );
};
