import React, { useContext } from 'react';
import MainContainer from '../../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import HierarchyList from '../HierarchyList';
import { ProjectContext, ProjectProvider } from '../ProjectProvider';

const ProjectContainer = () => {
  const [value, dispatch] = useContext(ProjectContext);
  return (
    <MainContainer title="Projects">
      <Grid.Row>
        <Grid.Column width="4">
          <HierarchyList
            onChange={project =>
              dispatch({ type: 'SELECT_PROJECT', value: project })
            }
            list={value.projects}
          ></HierarchyList>
        </Grid.Column>
        <Grid.Column width={12}>
          {value.selectedProject && value.selectedProject.name}
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

export default () => {
  return (
    <ProjectProvider>
      <ProjectContainer></ProjectContainer>
    </ProjectProvider>
  );
};
