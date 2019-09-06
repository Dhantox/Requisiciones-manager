import React from "react";
import PropTypes from "prop-types";
import MainContainer from "../../components/MainContainer";
import { Grid } from "semantic-ui-react";

const UsuariosContainer = props => {
  return (
    <MainContainer title="Usuarios">
      <Grid.Row>
        <Grid.Column></Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

UsuariosContainer.propTypes = {};

export default UsuariosContainer;
