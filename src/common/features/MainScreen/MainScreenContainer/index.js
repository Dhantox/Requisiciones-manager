import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainContainer from '../../../components/MainContainer';
import { Grid, Dropdown, Form, Button } from 'semantic-ui-react';

const PomodoroButton = ({ pomodoroState }) => {
  const dispatch = useDispatch();
  let button = {
    text: '',
    action: {}
  };
  switch (pomodoroState) {
    case 'awaiting_pomodoro':
      button = {
        text: 'Start Pomodoro',
        action: 'start_pomodoro'
      };
      break;
    case 'awaiting_break':
      button = {
        text: 'Break',
        action: 'start_break'
      };
      break;
    case 'pomodoro_started':
      button = {
        text: 'Cancel Pomodoro',
        action: 'cancel_pomodoro'
      };
      break;
    case 'break_started':
      button = {
        text: 'Cancel Break',
        action: 'cancel_break'
      };
      break;
  }
  return (
    <Button onClick={() => dispatch({ type: button.action })}>
      {button.text}
    </Button>
  );
};

const MainScreenContainer = () => {
  let projects = [];
  useSelector(state => state.projectReducer.projects).map(project => {
    if (project.children) {
      projects = projects.concat(
        project.children.map(child => {
          child.key = child.id;
          child.value = child.id;
          child.text = child.name;
          return child;
        })
      );
    }
    return project;
  });
  const pomodoroState = useSelector(state => state.pomodoroReducer);
  return (
    <MainContainer title="Pomodoro">
      <Grid.Row>
        <Grid.Column width={10}>
          <h1>{new Date().toTimeString()}</h1>
          {
            <PomodoroButton
              pomodoroState={pomodoroState.status}
            ></PomodoroButton>
          }
        </Grid.Column>
        <Grid.Column width={6}>
          <Form>
            <Form.Field>
              <label>Project</label>
              <Dropdown
                onChange={(e, { value }) => console.log(value)}
                placeholder="Select Project"
                fluid
                search
                selection
                options={projects}
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

export default MainScreenContainer;
