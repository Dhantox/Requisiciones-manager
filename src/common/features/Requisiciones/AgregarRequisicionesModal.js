import React, { useState } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import { useForm } from '../../hooks/formHooks';

const AgregarClientesModal = ({ onSubmit }) => {
  const [form, handleChange] = useForm({
    nombre: '',
    rfc: '',
    contacto: '',
    telefono: '',
    correo: ''
  });
  const [visible, setVisible] = useState(false);
  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      trigger={
        <Button onClick={() => setVisible(true)} primary>
          Agregar Requisición
        </Button>
      }
      centered={false}
    >
      <Modal.Header>Agregar cliente</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              fluid
              name="fecha"
              label="Fecha y Hora"
              placeholder="First name"
              onChange={handleChange}
              value={form.nombre}
            />
            <Form.Input
              fluid
              name="cliente"
              label="Cliente"
              placeholder="Cliente"
              onChange={handleChange}
              value={form.rfc}
            />
            <Form.Input
              fluid
              name="tipo"
              label="Tipo"
              placeholder="Tipo"
              onChange={handleChange}
              value={form.contacto}
            />
            <Form.TextArea
              fluid
              name="notas"
              label="Notas"
              placeholder="notas"
              onChange={handleChange}
              value={form.telefono}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions
        actions={[
          {
            key: 'done',
            content: 'Agregar Requisición',
            positive: true,
            onClick: () => {
              setVisible(false);
              onSubmit(form);
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

export default AgregarClientesModal;
