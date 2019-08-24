import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import styles from './style.module.css';

export default ({}) => {
  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBar}>
        <div className={styles.menuIcon}>
          <Link>
            <Icon name="th" size="big" />
          </Link>
        </div>
        <div className={styles.item}>
          <Link to="timer">
            <Icon name="clock outline" size="big" />
          </Link>
        </div>
        <div className={styles.item}>
          <Link to="projects">
            <Icon name="folder" size="big" />
          </Link>
        </div>
      </div>
    </div>
  );
};
