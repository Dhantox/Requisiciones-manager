import _ from 'lodash';
import React, { Component, useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

const TablaClientes = props => {
  const [state, setState] = useState({
    column: null,
    data: props.data,
    direction: null
  });
  const { column, data, direction } = state;

  useEffect(() => {
    setState({ ...state, data: props.data });
    return () => {};
  }, [props]);

  const handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });
      return;
    }

    setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };
  return (
    <Table sortable celled striped fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'name' ? direction : null}
            onClick={handleSort('name')}
          >
            Nombre
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'age' ? direction : null}
            onClick={handleSort('age')}
          >
            Teléfono
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'telefono' ? direction : null}
            onClick={handleSort('telefono')}
          >
            Correo
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'correo' ? direction : null}
            onClick={handleSort('correo')}
          >
            RFC
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, ({ rfc, id, nombre, correo, telefono }) => (
          <Table.Row key={id}>
            <Table.Cell>{nombre}</Table.Cell>
            <Table.Cell>{telefono}</Table.Cell>
            <Table.Cell>{correo}</Table.Cell>
            <Table.Cell>{rfc}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TablaClientes;
