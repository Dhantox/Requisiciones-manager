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
          Agregar cliente
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
              name="nombre"
              label="Nombre"
              placeholder="Nombre"
              onChange={handleChange}
              value={form.nombre}
            />
            <Form.Input
              fluid
              name="rfc"
              label="RFC"
              placeholder="RFC"
              onChange={handleChange}
              value={form.rfc}
            />
            <Form.Input
              fluid
              name="contacto"
              label="Contacto"
              placeholder="Contacto"
              onChange={handleChange}
              value={form.contacto}
            />
            <Form.Input
              fluid
              name="telefono"
              label="Teléfono"
              placeholder="Teléfono"
              onChange={handleChange}
              value={form.telefono}
            />
            <Form.Input
              fluid
              name="correo"
              label="Correo"
              placeholder="Correo"
              onChange={handleChange}
              value={form.correo}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions
        actions={[
          {
            key: 'done',
            content: 'Agregar Cliente',
            positive: true,
            onClick: () => {
              setVisible(false);
              onSubmit(form);
            }
          }
        ]}
      ></Modal.Actions>
    </Modal>
  );
};

export default AgregarClientesModal;
