import React from "react";
import PropTypes from "prop-types";
import MainContainer from "../../components/MainContainer";
import { Grid } from "semantic-ui-react";
import SortableTable from "../../components/SortableTable";
import AgregarUsuariosModal from "./AgregarUsuariosModal";

const UsuariosContainer = props => {
  return (
    <MainContainer
      title="Usuarios"
      optionsButtons={
        <>
          <AgregarUsuariosModal></AgregarUsuariosModal>
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

UsuariosContainer.propTypes = {};

export default UsuariosContainer;
