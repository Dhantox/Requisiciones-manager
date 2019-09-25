import React, { useState, useEffect } from 'react';
import { Form, Grid } from 'semantic-ui-react';
import DateTime from 'react-datetime';
import _ from 'lodash';
/**
 *
 * @param string mode: modo del modal: 'editar', 'agregar', 'ver'
 */

const VerCotizacionCompra = props => {
  return (
    <Form>
      <Form.Input
        name="fecha"
        label="Fecha"
        placeholder="Fecha"
        value={props.cotizacionCompra.fecha}
      ></Form.Input>
      <Form.Input
        name="monto"
        label="Costo"
        placeholder="Monto"
        value={props.cotizacionCompra.monto}
      />
      <Form.Input
        fluid
        name="proveedores"
        label="Proveedores"
        placeholder="Proveedores"
        value={props.cotizacionCompra.proveedores}
      />
      <Form.Input
        fluid
        name="folio"
        label="Folio"
        placeholder="folio"
        value={props.cotizacionCompra.folio}
      />
    </Form>
  );
};

export default VerCotizacionCompra;
