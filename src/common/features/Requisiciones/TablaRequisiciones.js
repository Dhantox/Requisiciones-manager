import _ from 'lodash';
import React, { Component, useState, useEffect } from 'react';
import { Table, Icon } from 'semantic-ui-react';

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
    <Table sortable celled striped >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'name' ? direction : null}
            onClick={handleSort('name')}
          >
            ID
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'age' ? direction : null}
            onClick={handleSort('age')}
          >
            Fecha correo
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'telefono' ? direction : null}
            onClick={handleSort('telefono')}
          >
            Cliente
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'telefono' ? direction : null}
            onClick={handleSort('telefono')}
          >
            Tipo
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'correo' ? direction : null}
            onClick={handleSort('correo')}
          >
            Folio
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'correo' ? direction : null}
            onClick={handleSort('correo')}
          >
            Monto
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'correo' ? direction : null}
            onClick={handleSort('correo')}
          >
            Estado
          </Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(
          data,
          ({ id, fecha_correo, cliente, tipo, estatus, cotizacion }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{fecha_correo}</Table.Cell>
              <Table.Cell>{cliente.nombre}</Table.Cell>
              <Table.Cell>{tipo.concepto}</Table.Cell>
              <Table.Cell>{cotizacion || 'Sin cotizacion'}</Table.Cell>
              <Table.Cell>{cotizacion || 'Sin cotizacion'}</Table.Cell>
              <Table.Cell>{estatus.concepto}</Table.Cell>
              <Table.Cell>
                <Icon color="green" name="add" size="large" />
                <Icon name="" size="large" />
                <Icon color="green" name="checkmark" size="large" />
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
};

export default TablaClientes;
