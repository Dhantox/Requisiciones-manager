import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';

const AgregarUsuariosModal = () => {
  const [visible, setVisible] = useState(true);
  return (
    <Modal trigger={<Button primary>Agregar usuario</Button>} centered={false}>
      <Modal.Header>Agregar usuario</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input fluid label="Nombre" placeholder="First name" />
              <Form.Input fluid label="Last name" placeholder="Last name" />
              <Form.Input fluid label="Gender" placeholder="Gender" />
            </Form.Group>
            <Form.Button onClick={() => setVisible(false)}>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default AgregarUsuariosModal;
