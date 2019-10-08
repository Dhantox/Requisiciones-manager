import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Divider, Dropdown } from 'semantic-ui-react';
import DropdownInput from '../../components/DropdownInput';
import DateTime from 'react-datetime';
import { useForm } from '../../hooks/formHooks';
import CompraRapida from './CompraRapida';
import { Reportes, Requisiciones, ComprasRapidas } from '../../../agent';
import showNotification from '../../utils/notifications';

/**
 *
 * @param string mode: modo del modal: 'editar', 'agregar', 'ver'
 */
const AgregarCotizacionModal = ({
  defaultForm,
  onSubmit,
  visible,
  setVisible,
  mode,
  proveedores
}) => {
  const dispatch = useDispatch();
  const requisicionReporteId = useSelector(store => {
    if (store.requisiciones.selectedRequisicion != null) {
      return store.requisiciones.selectedRequisicion.id;
    }
  });
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
  console.log(proveedores);
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
              label="Monto sin iva"
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
            <DropdownInput
              placeholder="Proveedores"
              label="Proveedores"
              name="orden_proveedor"
              onChange={handleChange}
              valuename="nombre_fiscal"
              fluid
              search
              selection
              options={proveedores}
              value={form.orden_proveedor}
              clearable
            ></DropdownInput>
            {/* <Form.Input
              fluid
              name="orden_proveedor"
              label="Orden proveedor"
              placeholder="Orden proveedor"
              onChange={handleChange}
              value={form.orden_proveedor}
            /> */}
          </Form>
        </Modal.Description>
        <Modal.Description>
          {mode != 'ver' && (
            <>
              <Divider></Divider>
              <CompraRapida
                compraRapida={compraRapidaVisible}
                visible={compraRapidaVisible}
                setVisible={() => setCompraRapidaVisible(!compraRapidaVisible)}
                onSubmit={form => {
                  dispatch({ type: 'LOADING' });
                  Requisiciones.ComprasRapidas.create(
                    form,
                    requisicionReporteId
                  )
                    .then(r => {
                      showNotification.success(
                        'Exito!',
                        'Estado de cotizacion guardado'
                      );
                      return Reportes.get(requisicionReporteId);
                    })
                    .then(r => {
                      dispatch({
                        type: 'CARGAR_REQUISICIONES_SUCCESS',
                        payload: r.data
                      });
                    })
                    .finally(e => dispatch({ type: 'STOP_LOADING' }));
                }}
              ></CompraRapida>
            </>
          )}
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
