import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

const TablaUsuarios = props => {
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
            Usuario
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'age' ? direction : null}
            onClick={handleSort('age')}
          >
            Correo
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'telefono' ? direction : null}
            onClick={handleSort('telefono')}
          >
            Nombre
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'correo' ? direction : null}
            onClick={handleSort('correo')}
          >
            Apellido
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(data, ({ username, email, first_name, last_name, id }) => (
          <Table.Row key={id}>
            <Table.Cell>{username}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{first_name}</Table.Cell>
            <Table.Cell>{last_name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TablaUsuarios;
