import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Form } from 'semantic-ui-react';
import MainContainer from '../../../components/MainContainer';
import PomodoroButton from '../PomodoroButtonContainer';
import Timer from '../Timer';
import DropdownInput from '../../../components/DropdownInput';

const MainScreenContainer = () => {
  let projects = [];
  const dispatch = useDispatch();
  useSelector(state => state.projectReducer.projects).map(project => {
    if (project.children) {
      projects = projects.concat(project.children.map(item => ({ ...item })));
    }
    return project;
  });
  const pomodoroState = useSelector(state => state.pomodoroReducer);
  return (
    <MainContainer title="Pomodoro">
      <Grid.Row>
        <Grid.Column width={10}>
          <Timer />
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
              <DropdownInput
                onChange={(e, { value }) =>
                  dispatch({
                    type: 'select_pomodoro_project',
                    payload: value
                  })
                }
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
