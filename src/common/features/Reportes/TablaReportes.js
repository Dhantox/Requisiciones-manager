import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import styles from './tabla.module.css';
import moment from 'moment';

const prioridad = (horaDeCorreo, status) => {
  var horaActual = moment();
  var horaCorreo = moment(horaDeCorreo);
  var positive = { positive: styles.colorPositive };
  var negative = { negative: styles.colorWarning };
  var warning = { warning: styles.colorNegative };
  var tiempoTranscurrido = horaActual.diff(horaCorreo, 'hours', 'minutes');
  if (tiempoTranscurrido <= 24) {
    return positive.positive;
  } else {
    if (tiempoTranscurrido <= 48) {
      return negative.negative;
    } else {
      return warning.warning;
    }
  }
};

const TablaReportes = props => {
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
    <Table sortable celled striped compact>
      <Table.Header>
        <Table.Row textAlign={'center'}>
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
            Fecha de entrega
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'tiempo_transcurrido' ? direction : null}
            onClick={handleSort('tiempo_transcurrido')}
          >
            Precio
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'tipo' ? direction : null}
            onClick={handleSort('tipo')}
          >
            Proveedores
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'folio' ? direction : null}
            onClick={handleSort('folio')}
          >
            Paqueteria
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'cliente' ? direction : null}
            onClick={handleSort('cliente')}
          >
            Numero de guia
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={column === 'cliente' ? direction : null}
            onClick={handleSort('cliente')}
          >
            Estado de compra
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_.map(
          data,
          ({
            id,
            estado_compra,
            rastreo,
            costo,
            proveedores,
            fecha_creacion,
            paqueteria
          }) => (
            <Table.Row onClick={e => props.onSelectRequisicion(id)} key={id}>
              <Table.Cell textAlign={'center'}>{id}</Table.Cell>
              <Table.Cell>{fecha_creacion}</Table.Cell>
              <Table.Cell>{costo}</Table.Cell>
              <Table.Cell>{proveedores}</Table.Cell>
              <Table.Cell>{paqueteria}</Table.Cell>
              <Table.Cell>{rastreo}</Table.Cell>
              <Table.Cell>{estado_compra}</Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table>
  );
};

export default TablaReportes;
