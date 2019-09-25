import React, { useEffect } from 'react';
import { Modal, Form, Divider } from 'semantic-ui-react';
import DateTime from 'react-datetime';
import { useForm } from '../../hooks/formHooks';
import ReportesContainer from '../Reportes/ReportesContainer';

const EstadoRequisicionModal = ({ onSubmit, visible, setVisible }) => {
  const [form, handleChange, setForm] = useForm({
    fecha_creacion: '',
    costo: '',
    proveedores: '',
    rastreo: '',
    paqueteria: ''
  });

  return (
    <Modal open={visible} onClose={() => setVisible(false)} centered={false}>
      <Modal.Header>Estado requisición</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Fecha de entrega</label>
              <DateTime
                dateFormat="YYYY-DD-MM"
                timeFormat={false}
                value={form.fecha_creacion}
                onChange={date => setForm({ ...form, fecha_creacion: date })}
              ></DateTime>
            </Form.Field>
            <Form.Input
              type="number"
              fluid
              name="costo"
              label="Precio"
              placeholder="Precio"
              onChange={handleChange}
              value={form.costo}
            />
            <Form.Input
              fluid
              name="proveedores"
              label="Proveedores"
              placeholder="Provedoores"
              onChange={handleChange}
              value={form.proveedores}
            />
            <Form.Input
              fluid
              name="paqueteria"
              label="Paqueteria"
              placeholder="Paqueteria"
              onChange={handleChange}
              value={form.paqueteria}
            />
            <Form.Input
              fluid
              name="rastreo"
              label="Numero de guia"
              placeholder="Numero de guia"
              onChange={handleChange}
              value={form.rastreo}
            />
          </Form>
        </Modal.Description>
        <Divider />
        <Modal.Actions
          actions={[
            {
              key: 'done',
              content: 'Agregar compra',
              positive: true,
              onClick: () => {
                const newForm = { ...form };
                newForm.fecha_creacion = form.fecha_creacion.format(
                  'YYYY-MM-DD HH:mm'
                );
                setVisible(true);
                onSubmit(newForm);
              }
            }
          ]}
        ></Modal.Actions>
        <Divider />
        <Modal.Description>
          <ReportesContainer></ReportesContainer>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions
        actions={[
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
