import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import styles from './styles.module.css';

const MainContainer = ({ children, title, optionsButtons }) => {
  return (
    <div className={styles.mainContainer}>
      <div>
        <Container fluid className={styles.paddingfix}>
          <Grid>
            <Grid.Column>
              <Grid.Column className={styles.bordeBottom}>
                <h1 className={styles.title}>{title}</h1>{' '}
              </Grid.Column>
              <Grid.Column className={styles.tableCard}>
                <Grid.Row className={styles.tablePadd}>
                  <Grid.Column className={styles.fixedcolumn}>
                    {optionsButtons}
                  </Grid.Column>
                  <Grid.Column className={styles.fixedcolumn}>
                    {children}
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default MainContainer;
