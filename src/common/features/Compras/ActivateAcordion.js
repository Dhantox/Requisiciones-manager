import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { Modal, Form } from 'semantic-ui-react';
import DateTime from 'react-datetime';
export default class AccordionReportes extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          Agregar Compra <Icon name="add" bordered />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
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
