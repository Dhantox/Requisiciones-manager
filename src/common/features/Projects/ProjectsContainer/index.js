import React, { useContext } from 'react';
import MainContainer from '../../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import HierarchyList from '../HierarchyList';
import { useSelector, useDispatch } from 'react-redux';

const ProjectContainer = () => {
  let selectedProject = useSelector(
    state => state.projectReducer.selectedProject
  );
  const projects = useSelector(state => state.projectReducer.projects);
  const dispatch = useDispatch();
  return (
    <MainContainer title="Projects">
      <Grid.Row>
        <Grid.Column width="4">
          <HierarchyList
            onChange={project =>
              dispatch({ type: 'SELECT_PROJECT', payload: project })
            }
            list={projects}
          ></HierarchyList>
        </Grid.Column>
        <Grid.Column width={12}>
          {selectedProject && selectedProject.name}
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

export default () => {
  return <ProjectContainer></ProjectContainer>;
};
