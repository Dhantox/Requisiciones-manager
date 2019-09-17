import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useForm } from '../../hooks/formHooks';

const AgregarProveedoresModal = ({ onSubmit }) => {
  const [form, handleChange] = useForm({
    nombre_fiscal: '',
    nombre_comercial: '',
    direccion: '',
    rfc: '',
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
          Agregar proveedor
        </Button>
      }
      centered={false}
    >
      <Modal.Header>Agregar proveedor</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              fluid
              name="nombre_fiscal"
              label="Nombre Fiscal"
              placeholder="Nombre Fiscal"
              onChange={handleChange}
              value={form.nombre_fiscal}
            />
            <Form.Input
              fluid
              name="nombre_comercial"
              label="Nombre Comercial"
              placeholder="Nombre Comercial"
              onChange={handleChange}
              value={form.nombre_comercial}
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
              name="direccion"
              label="Direccion"
              placeholder="Direccion"
              onChange={handleChange}
              value={form.direccion}
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
            content: 'Agregar Proveedor',
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

export default AgregarProveedoresModal;
