import _ from 'lodash';
import React, { Component, useState, useEffect } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import styles from './tabla.css';

const TablaRequisiciones = props => {
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
    <Table sortable celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={column === 'id' ? direction : null}
            onClick={handleSort('id')}
          >
            ID
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'fecha_correo' ? direction : null}
            onClick={handleSort('fecha_correo')}
          >
            Fecha correo
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'tiempo_transcurrido' ? direction : null}
            onClick={handleSort('tiempo_transcurrido')}
          >
            Tiempo transcurrido
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'cliente' ? direction : null}
            onClick={handleSort('cliente')}
          >
            Cliente
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'tipo' ? direction : null}
            onClick={handleSort('tipo')}
          >
            Tipo
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'folio' ? direction : null}
            onClick={handleSort('folio')}
          >
            Folio
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'monto' ? direction : null}
            onClick={handleSort('monto')}
          >
            Monto
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'estado' ? direction : null}
            onClick={handleSort('estado')}
          >
            Estado
          </Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(
          data,
          ({ id, fecha_correo, cliente, tipo, estatus, cotizacion }) => (
            <Table.Row onClick={e => props.onSelectRequisicion(id)} key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{fecha_correo.format('DD/MM/YY')}</Table.Cell>
              <Table.Cell>{fecha_correo.fromNow()}</Table.Cell>
              <Table.Cell>{cliente.nombre}</Table.Cell>
              <Table.Cell>{tipo.concepto}</Table.Cell>
              <Table.Cell>
                {cotizacion ? cotizacion.folio : 'Sin cotización'}
              </Table.Cell>
              <Table.Cell>
                {cotizacion ? cotizacion.monto : 'Sin cotización'}
              </Table.Cell>
              <Table.Cell>{estatus.concepto}</Table.Cell>
              <Table.Cell>
                <Icon
                  onClick={e => {
                    e.persist();
                    props.onAgregarCotizacionClick(id);
                  }}
                  color="green"
                  name="add"
                  size="large"
                  bordered="square"
                />
                <Icon name="" size="large" />
                <Icon color="green" name="checkmark" size="large" bordered="square" />
              </Table.Cell >
              
              <Table.Cell>

              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
};

export default TablaRequisiciones;
