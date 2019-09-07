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
  const [visible, setVisible] = useState(true);
  return (
    <Modal trigger={<Button primary>Agregar cliente</Button>} centered={false}>
      <Modal.Header>Agregar cliente</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              fluid
              name="nombre"
              label="Nombre"
              placeholder="First name"
              onChange={handleChange}
              value={form.nombre}
            />
            <Form.Input
              fluid
              name="rfc"
              label="RFC"
              placeholder="Last name"
              onChange={handleChange}
              value={form.rfc}
            />
            <Form.Input
              fluid
              name="contacto"
              label="Contacto"
              placeholder="Last name"
              onChange={handleChange}
              value={form.contacto}
            />
            <Form.Input
              fluid
              name="telefono"
              label="Teléfono"
              placeholder="Last name"
              onChange={handleChange}
              value={form.telefono}
            />
            <Form.Input
              fluid
              name="correo"
              label="Correo"
              placeholder="Last name"
              onChange={handleChange}
              value={form.correo}
            />
            <Form.Button onClick={() => onSubmit(form)}>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default AgregarClientesModal;
