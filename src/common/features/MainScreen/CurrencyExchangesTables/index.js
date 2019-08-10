import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

export default ({ currencyExchanges }) => (
  <Table basic="very" unstackable striped celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Nombre</Table.HeaderCell>
        <Table.HeaderCell>Compra</Table.HeaderCell>
        <Table.HeaderCell>Venta</Table.HeaderCell>
        <Table.HeaderCell>Distancia</Table.HeaderCell>
        <Table.HeaderCell>Ultima actualizacion</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {currencyExchanges.map(currencyExchange => (
        <Table.Row key={currencyExchange.id}>
          <Table.Cell>
            <Link to={`currency-exchanges/${currencyExchange.id}`}>
              {currencyExchange.name}
            </Link>
          </Table.Cell>
          <Table.Cell>{currencyExchange.buy}</Table.Cell>
          <Table.Cell>{currencyExchange.sell}</Table.Cell>
          <Table.Cell>{currencyExchange.distance}</Table.Cell>
          <Table.Cell>{currencyExchange.last_update}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
