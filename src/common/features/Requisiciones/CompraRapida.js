import React, { Component } from 'react';
import { Accordion, Icon, Checkbox } from 'semantic-ui-react';
import { Modal, Form } from 'semantic-ui-react';
import DateTime from 'react-datetime';
export default class AccordionReportes extends Component {
  render() {
    // pasarle una funcion a compra rapida que se llame activar compra rapida onclisk
    // esa funcion va a tener el estado de activo o inactivo y ese se lo pasare a compra rapida
    return (
      <Accordion>
        <Accordion.Title>
          <Checkbox
            label={'Compra Rapida'}
            value={this.props.visible}
            onClick={this.props.setVisible}
          />
        </Accordion.Title>
        <Accordion.Content active={this.props.visible}>
          <Form>
            <Form.Field>
              <label>Fecha de entrega</label>
              <DateTime dateFormat="YYYY-DD-MM" timeFormat={false}></DateTime>
            </Form.Field>
            <Form.Input
              type="number"
              fluid
              name="monto"
              label="Precio"
              placeholder="Precio"
            />
            <Form.Input
              fluid
              name="proveedor"
              label="Proveedor"
              placeholder="Provedoor"
            />
            <Form.Input
              fluid
              name="opaqueteria"
              label="Paqueteria"
              placeholder="Paqueteria"
            />
            <Form.Input
              fluid
              name="numero_guia"
              label="Numero de guia"
              placeholder="Numero de guia"
            />
          </Form>
        </Accordion.Content>
      </Accordion>
    );
  }
}
