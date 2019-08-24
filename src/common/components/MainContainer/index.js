import React from 'react';
import { Grid } from 'semantic-ui-react';
import styles from './styles.module.css';

const MainContainer = ({ children, title }) => {
  return (
    <div className={styles.mainContainer}>
      <Grid>
        <Grid.Row>
          <h1 className={styles.title}>{title}</h1>
        </Grid.Row>
        <Grid.Row>{children}</Grid.Row>
      </Grid>
    </div>
  );
};

export default MainContainer;
