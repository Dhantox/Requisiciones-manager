import React, { useState } from 'react';
import MainContainer from '../../../components/MainContainer';
import { Grid, Dropdown, Form } from 'semantic-ui-react';

export default () => {
  let [project, setProject] = useState();
  return (
    <MainContainer title="Pomodoro">
      <Grid.Row>
        <Grid.Column width={10}>
          <h1>{new Date().toTimeString()}</h1>
        </Grid.Column>
        <Grid.Column width={6}>
          <Form>
            <Form.Field>
              <label>Project</label>
              <Dropdown
                onChange={(e, { value }) => setProject(value)}
                placeholder="Select Project"
                fluid
                search
                selection
                options={[
                  { key: 1, value: 1, text: 'English' },
                  { key: 2, value: 2, text: 'React' }
                ]}
              />
            </Form.Field>
          </Form>
          <h3>Today</h3>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>Time</Grid.Column>
              <Grid.Column textAlign="right">03:05</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>Sessions</Grid.Column>
              <Grid.Column textAlign="right">5</Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>Daily Average</Grid.Column>
              <Grid.Column textAlign="right">05:00</Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};
