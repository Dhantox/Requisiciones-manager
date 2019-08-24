import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import styles from './style.module.css';

export default ({}) => {
  return (
    <div className={styles.navBarContainer}>
      <div className={styles.navBar}>
        <div className={styles.menuIcon}>
          <Icon name="th" size="big" />
        </div>
        <div className={styles.item}>
          <Icon name="clock outline" size="big" />
        </div>
        <div className={styles.item}>
          <Icon name="folder" size="big" />
        </div>
      </div>
    </div>
  );
};
