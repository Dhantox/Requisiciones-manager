import React from 'react';
import { Grid } from 'semantic-ui-react';
import styles from './styles.module.css';

const MainContainer = ({ children, title }) => {
  return (
    <div className={styles.mainContainer}>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <h1 className={styles.title}>{title}</h1>
          </Grid.Column>
        </Grid.Row>
        {children}
      </Grid>
    </div>
  );
};

export default MainContainer;
