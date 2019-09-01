import React, { useState } from 'react';
import MainContainer from '../../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import HierarchyList from '../HierarchyList';

export default () => {
  const [projectSelected, setProjectSelected] = useState();
  let projects = [
    {
      id: 6,
      name: 'Languages',
      children: [
        {
          id: 4,
          name: 'English'
        }
      ]
    },
    {
      id: 1,
      name: 'Tech',
      children: [
        {
          id: 5,
          name: 'Ruby'
        }
      ]
    }
  ];
  useState();
  return (
    <MainContainer title="Projects">
      <Grid.Row>
        <Grid.Column width="4">
          <HierarchyList
            onChange={project => setProjectSelected(project)}
            list={projects}
          ></HierarchyList>
        </Grid.Column>
        <Grid.Column width={12}>
          {projectSelected && projectSelected.name}
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};
