import React, { useState } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import DropdownInput from '../../components/DropdownInput';
import { useForm } from '../../hooks/formHooks';

const AgregarClientesModal = ({ requisicionesTipos, clientes, onSubmit }) => {
  const [form, handleChange] = useForm({
    fecha: '',
    cliente: '',
    tipo: '',
    notas: ''
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
              value={form.fecha}
            />
            <DropdownInput
              placeholder="Cliente"
              label="Cliente"
              name="cliente"
              onChange={handleChange}
              valuename="nombre"
              fluid
              search
              selection
              options={clientes}
              value={form.cliente}
              clearable
            ></DropdownInput>
            <DropdownInput
              placeholder="Tipo"
              label="Tipo"
              name="tipo"
              onChange={handleChange}
              valuename="concepto"
              fluid
              search
              selection
              options={requisicionesTipos}
              value={form.tipo}
              clearable
            ></DropdownInput>
            <Form.TextArea
              name="notas"
              label="Notas"
              placeholder="notas"
              onChange={handleChange}
              value={form.notas}
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
