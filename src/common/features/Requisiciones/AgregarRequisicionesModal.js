import React, { useState } from 'react';
import { Button, Header, Image, Modal, Form } from 'semantic-ui-react';
import DropdownInput from '../../components/DropdownInput';
import DateTime from 'react-datetime';
import { useForm } from '../../hooks/formHooks';
import moment from 'moment';

const AgregarClientesModal = ({ requisicionesTipos, clientes, onSubmit }) => {
  const [form, handleChange, setForm] = useForm({
    fecha_correo: moment(),
    cliente_id: '',
    tipo_id: '',
    nota: ''
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
      <Modal.Header>Agregar Requisición</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Fecha y Hora del correo</label>
              <DateTime
                value={form.fecha_correo}
                onChange={date => setForm({ ...form, fecha_correo: date })}
              ></DateTime>
            </Form.Field>
            <DropdownInput
              placeholder="Cliente"
              label="Cliente"
              name="cliente_id"
              onChange={handleChange}
              valuename="nombre"
              fluid
              search
              selection
              options={clientes}
              value={form.cliente_id}
              clearable
            ></DropdownInput>
            <DropdownInput
              placeholder="Tipo"
              label="Tipo"
              name="tipo_id"
              onChange={handleChange}
              valuename="concepto"
              fluid
              search
              selection
              options={requisicionesTipos}
              value={form.tipo_id}
              clearable
            ></DropdownInput>
            <Form.TextArea
              name="nota"
              label="Notas"
              placeholder="notas"
              onChange={handleChange}
              value={form.nota}
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
              newForm.fecha_correo = form.fecha_correo.format(
                'YYYY-MM-DD HH:mm'
              );
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
