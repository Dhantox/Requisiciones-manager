import React, { useEffect, useState } from 'react';
import { Modal, Form, Divider } from 'semantic-ui-react';
import DateTime from 'react-datetime';
import { useForm } from '../../hooks/formHooks';
import CompraRapida from './CompraRapida';

/**
 *
 * @param string mode: modo del modal: 'editar', 'agregar', 'ver'
 */
const AgregarCotizacionModal = ({
  defaultForm,
  onSubmit,
  visible,
  setVisible,
  mode
}) => {
  const [form, handleChange, setForm] = useForm(defaultForm);
  useEffect(() => {
    setForm(defaultForm);
  }, [defaultForm]);
  const modal = {};
  switch (mode) {
    case 'ver':
      modal.title = 'Ver';
      modal.buttons = [];
      break;
    case 'editar':
      modal.title = 'Agregar';
      break;
    default:
      modal.title = 'Agregar';
      modal.buttons = [
        {
          key: 'done',
          content: 'Agregar cotización',
          primary: true,
          onClick: () => {
            const newForm = { ...form };
            newForm.fecha = form.fecha.format('YYYY-MM-DD HH:mm');
            setVisible(false);
            onSubmit(newForm);
          }
        }
      ];
  }
  const [compraRapidaVisible, setCompraRapidaVisible] = useState(false);

  return (
    <Modal open={visible} onClose={() => setVisible(false)} centered={false}>
      <Modal.Header>{modal.title} cotización</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Fecha</label>
              <DateTime
                dateFormat="YYYY-DD-MM"
                value={form.fecha}
                timeFormat={false}
                onChange={date => setForm({ ...form, fecha: date })}
              ></DateTime>
            </Form.Field>
            <Form.Input
              type="number"
              fluid
              name="monto"
              label="Monto"
              placeholder="Monto"
              onChange={handleChange}
              value={form.monto}
            />
            <Form.Input
              fluid
              name="folio"
              label="Folio"
              placeholder="folio"
              onChange={handleChange}
              value={form.folio}
            />
            <Form.Input
              fluid
              name="orden_proveedor"
              label="Orden proveedor"
              placeholder="Orden proveedor"
              onChange={handleChange}
              value={form.orden_proveedor}
            />
          </Form>
        </Modal.Description>
        <Divider></Divider>
        <Modal.Description>
          <CompraRapida
            visible={compraRapidaVisible}
            setVisible={() => setCompraRapidaVisible(!compraRapidaVisible)}
          ></CompraRapida>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions
        actions={[
          ...modal.buttons,
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

export default AgregarCotizacionModal;
