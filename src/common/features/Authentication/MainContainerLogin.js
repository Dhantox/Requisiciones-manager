import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import styles from './styles.module.css';

const MainContainer = ({ children, title, optionsButtons }) => {
  return (
    <Container className={`${styles.mainContainer}  `}>
      <Grid>
        <Grid.Column>
          <Grid.Column className={`${styles.tableCard}  `}>
            <Grid.Column
              className={`${styles.bordeBottom} ${styles.colorTop} ${styles.tablePadd} ${styles.borderTop}`}
            >
              <h1 className={styles.title}>{title}</h1>
            </Grid.Column>
            <Grid.Row className={styles.tablePadd}>
              <Grid.Column>{optionsButtons}</Grid.Column>
              <Grid.Column>{children}</Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default MainContainer;
