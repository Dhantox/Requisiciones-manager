import React, { useState } from 'react';
import { Button, Modal, Form, ModalActions } from 'semantic-ui-react';
import { useForm } from '../../hooks/formHooks';

const AgregarUsuariosModal = ({ onSubmit }) => {
  const [form, handleChange] = useForm({
    usuario: '',
    password: '',
    correo: '',
    nombre: '',
    apellido: ''
  });
  const [visible, setVisible] = useState(false);
  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      trigger={
        <Button onClick={() => setVisible(true)} primary>
          Agregar usuario
        </Button>
      }
      centered={false}
    >
      <Modal.Header>Agregar usuario</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              fluid
              name="usuario"
              label="Usuario"
              placeholder="Usuario"
              onChange={handleChange}
              value={form.usuario}
            />
            <Form.Input
              type="password"
              fluid
              name="contraseña"
              label="Contraseña"
              placeholder="Contraseña"
              onChange={handleChange}
              value={form.contraseña}
            />
            <Form.Input
              fluid
              name="correo"
              label="Correo"
              placeholder="Correo"
              onChange={handleChange}
              value={form.correo}
            />
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
              name="apellido"
              label="Apellido"
              placeholder="Apellido"
              onChange={handleChange}
              value={form.apellido}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <ModalActions
        actions={[
          {
            key: 'done',
            content: 'Agregar Usuario',
            positive: true,
            onClick: () => {
              setVisible(false);
              onSubmit(form);
            }
          }
        ]}
      ></ModalActions>
    </Modal>
  );
};

export default AgregarUsuariosModal;
