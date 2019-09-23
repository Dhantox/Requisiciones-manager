import React, { useEffect } from 'react';
import { Modal, Form } from 'semantic-ui-react';
import DropdownInput from '../../components/DropdownInput';
import { useForm } from '../../hooks/formHooks';
import AccordionReportes from './ActivateAcordion';

const EstadoRequisicionModal = ({
  onSubmit,
  visible,
  setVisible,
  estadosCategorias,
  estatus,
  defaultForm
}) => {
  const [form, handleChange, setForm] = useForm({
    estatus_id: defaultForm.estatus_id,
    categoria_id: '',
    razon: ''
  });

  useEffect(() => {
    setForm(defaultForm);
    return () => {};
  }, [defaultForm]);

  return (
    <Modal open={visible} onClose={() => setVisible(false)} centered={false}>
      <Modal.Header>Estado requisición</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <DropdownInput
              placeholder="Estatus"
              label="Estatus"
              name="estatus_id"
              onChange={handleChange}
              valuename="concepto"
              fluid
              search
              selection
              options={estatus}
              value={form.estatus_id}
              clearable
            ></DropdownInput>
            <DropdownInput
              placeholder="Categoria"
              label="Categoria"
              name="categoria_id"
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
        <Modal.Description>
          <AccordionReportes></AccordionReportes>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions
        actions={[
          {
            key: 'done',
            content: 'Guardar estado',
            positive: true,
            onClick: () => {
              const newForm = { ...form };
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
