import React from 'react';
import { Modal, Form } from 'semantic-ui-react';
import DropdownInput from '../../components/DropdownInput';
import { useForm } from '../../hooks/formHooks';
import moment from 'moment';

const EstadoRequisicionModal = ({
  onSubmit,
  visible,
  setVisible,
  estadosCategorias,
  estatus
}) => {
  const [form, handleChange, setForm] = useForm({
    fecha: moment(),
    categoria_id: '',
    razon: ''
  });
  return (
    <Modal open={visible} onClose={() => setVisible(false)} centered={false}>
      <Modal.Header>Estado requisición</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <DropdownInput
              placeholder="Estatus"
              label="Estatus"
              name="estatus"
              onChange={handleChange}
              valuename="concepto"
              fluid
              search
              selection
              options={estatus}
              value={form.estatus}
              clearable
            ></DropdownInput>
            <DropdownInput
              placeholder="Categoria"
              label="Categoria"
              name="categoria"
              onChange={handleChange}
              valuename="categoria"
              fluid
              search
              selection
              options={estadosCategorias}
              value={form.categoria_id}
              clearable
            ></DropdownInput>
            <Form.TextArea
              type="number"
              name="razon"
              label="Razón"
              placeholder="Razón"
              onChange={handleChange}
              value={form.razon}
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

export default EstadoRequisicionModal;
