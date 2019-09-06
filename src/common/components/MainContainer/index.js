import React from "react";
import { Grid, Container } from "semantic-ui-react";
import styles from "./styles.module.css";

const MainContainer = ({ children, title, optionsButtons }) => {
  return (
    <div className={styles.mainContainer}>
      <div className="main-container">
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <h1 className={styles.title}>{title}</h1>{" "}
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                {optionsButtons}
              </Grid.Column>
            </Grid.Row>
            {children}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default MainContainer;
