import React, { useState } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import DropdownInput from '../../components/DropdownInput';
import DateTime from 'react-datetime';
import { useForm } from '../../hooks/formHooks';
import moment from 'moment';

const AgregarClientesModal = ({ requisicionesTipos, clientes, onSubmit }) => {
  const [form, handleChange, setForm] = useForm({
    fecha: moment(),
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
            <Form.Field>
              <label>Fecha y Hora del correo</label>
              <DateTime
                value={form.fecha}
                name="fecha"
                onChange={date => setForm({ ...form, fecha: date })}
              ></DateTime>
            </Form.Field>
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

export default AgregarClientesModal;
