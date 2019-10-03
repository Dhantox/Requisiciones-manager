import React from "react";
import { Card } from "semantic-ui-react";

const RequisicionesTotales = props => {
  return (
    <Card.Group centered itemsPerRow={4}>
      <Card color={"green"}>
        <Card.Content>
          <Card.Header>Aceptadas</Card.Header>
        </Card.Content>
      </Card>
      <Card color={"blue"}>
        <Card.Content>
          <Card.Header>Cotizadas</Card.Header>
        </Card.Content>
      </Card>
      <Card color={"yellow"}>
        <Card.Content>
          <Card.Header>Pendientes</Card.Header>
        </Card.Content>
      </Card>
      <Card color={"red"}>
        <Card.Content>
          <Card.Header>Rechazadas</Card.Header>
        </Card.Content>
      </Card>
    </Card.Group>
  );
};
export default RequisicionesTotales;
