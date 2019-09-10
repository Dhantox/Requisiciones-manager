import React, { useState } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import DropdownInput from '../../components/DropdownInput';
import DateTime from 'react-datetime';
import { useForm } from '../../hooks/formHooks';
import moment from 'moment';

const AgregarCotizacionModal = ({ onSubmit, visible, setVisible }) => {
  const [form, handleChange, setForm] = useForm({
    fecha: moment(),
    monto: '',
    folio: '',
    orden_proveedor: ''
  });
  return (
    <Modal open={visible} onClose={() => setVisible(false)} centered={false}>
      <Modal.Header>Agregar cotización</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Fecha</label>
              <DateTime
                dateFormat="YYYY-DD-MM"
                value={form.fecha}
                timeFormat={false}
                onChange={date => setForm({ ...form, fecha: date })}
              ></DateTime>
            </Form.Field>
            <Form.Input
              type="number"
              fluid
              name="monto"
              label="Monto"
              placeholder="Monto"
              onChange={handleChange}
              value={form.monto}
            />
            <Form.Input
              fluid
              name="folio"
              label="Folio"
              placeholder="folio"
              onChange={handleChange}
              value={form.folio}
            />
            <Form.Input
              fluid
              name="orden_proveedor"
              label="Orden proveedor"
              placeholder="Orden proveedor"
              onChange={handleChange}
              value={form.orden_proveedor}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions
        actions={[
          {
            key: 'done',
            content: 'Agregar cotización',
            positive: true,
            onClick: () => {
              const newForm = { ...form };
              newForm.fecha = form.fecha.format('YYYY-MM-DD HH:mm');
              setVisible(false);
              onSubmit(newForm);
            }
          },
          {
            key: 'cancelar',
            content: 'Cancelar',
            positive: false,
            onClick: () => {
              setVisible(false);
            }
          }
        ]}
      ></Modal.Actions>
    </Modal>
  );
};

export default AgregarCotizacionModal;
