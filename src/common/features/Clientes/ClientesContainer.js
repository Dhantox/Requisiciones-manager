import React from 'react';
import PropTypes from 'prop-types';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import SortableTable from '../../components/SortableTable';
import AgregarClientesModal from './AgregarClientesModal';

const ClientesContainer = props => {
  return (
    <MainContainer
      title="Clientes"
      optionsButtons={
        <>
          <AgregarClientesModal></AgregarClientesModal>
        </>
      }
    >
      <Grid.Row>
        <Grid.Column>
          <SortableTable></SortableTable>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

ClientesContainer.propTypes = {};

export default ClientesContainer;
