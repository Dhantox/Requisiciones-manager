import React from 'react';
import MainContainer from '../../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import HierarchyList from '../HierarchyList';

export default () => {
  return (
    <MainContainer title="Projects">
      <Grid.Row>
        <Grid.Column>
          <HierarchyList
            list={[
              {
                id: 6,
                name: 'Languages',
                open: true,
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
            ]}
          ></HierarchyList>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};
