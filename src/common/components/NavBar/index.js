import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styles from './style.module.css';

export default props => {
  let location = props.history.location.pathname;
  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBar}>
        <div className={styles.item}>
          <Icon name="th" size="big" />
        </div>
        <div
          className={`${
            location === '/timer' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="timer">
            <Icon name="clock outline" size="big" />
          </Link>
        </div>
        <div
          className={`${
            location === '/usuarios' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="usuarios">
            <Icon name="users" size="big" />
          </Link>
        </div>
        <div
          className={`${
            location === '/clientes' ? styles.selectedItem : styles.item
          }`}
        >
          <Link to="clientes">
            <Icon name="users" size="big" />
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
  );
};
