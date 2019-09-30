import React, { Component } from 'react';
import { Accordion, Icon, Checkbox, Button } from 'semantic-ui-react';
import { Modal, Form } from 'semantic-ui-react';
import DateTime from 'react-datetime';
import { useForm } from '../../hooks/formHooks';
import TablaReportes from '../Reportes/TablaReportes';

const CompraRapida = props => {
  // pasarle una funcion a compra rapida que se llame activar compra rapida onclisk
  // esa funcion va a tener el estado de activo o inactivo y ese se lo pasare a compra rapida
  const [form, handleChange, setForm] = useForm({
    fecha_creacion: '',
    costo: '',
    proveedores: ''
  });

  return (
    <Accordion>
      <Accordion.Title>
        <Checkbox
          label={'Compra Rapida'}
          value={props.visible}
          onClick={props.setVisible}
        />
      </Accordion.Title>
      <Accordion.Content active={props.visible}>
        <Form>
          <Form.Field>
            <label>Fecha</label>
            <DateTime
              dateFormat="YYYY-DD-MM"
              timeFormat={false}
              value={form.fecha_creacion}
              onChange={date => setForm({ ...form, fecha_creacion: date })}
            ></DateTime>
          </Form.Field>
          <Form.Input
            type="number"
            fluid
            name="costo"
            label="Costo"
            placeholder="Costo"
            onChange={handleChange}
            value={form.costo}
          />
          <Form.Input
            fluid
            name="proveedores"
            label="Proveedores"
            placeholder="Provedores"
            onChange={handleChange}
            value={form.proveedores}
          />
          <Form.Field>
            <Button
              icon="add"
              primary
              actions={[
                {
                  key: 'done',
                  content: 'Agregar compra',
                  positive: true,
                  onClick: () => {
                    const newForm = { ...form };
                    newForm.fecha_creacion = form.fecha_creacion.format(
                      'YYYY-MM-DD HH:mm'
                    );
                    props.onSubmit(newForm);
                  }
                }
              ]}
            ></Button>
          </Form.Field>
        </Form>
      </Accordion.Content>
    </Accordion>
  );
};
export default CompraRapida;
