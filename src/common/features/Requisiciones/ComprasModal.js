import React, { useEffect } from 'react';
import { Modal, Divider } from 'semantic-ui-react';
import { useForm } from '../../hooks/formHooks';
import { useDispatch, useSelector } from 'react-redux';
import ReportesContainer from '../Reportes/ReportesContainer';
import VerCotizacionCompra from '../Compras/VerCotizacionCompra';
import { getSelectedRequisicion } from './selectors';
/**
 *
 * @param string mode: modo del modal: 'editar', 'agregar', 'ver'
 */

const ComprasModal = ({ defaultForm, onSubmit, visible, setVisible, mode }) => {
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
          positive: true,
          onClick: () => {
            const newForm = { ...form };
            newForm.fecha = form.fecha.format('YYYY-MM-DD HH:mm');
            setVisible(false);
            onSubmit(newForm);
          }
        }
      ];
  }
  const selectedRequisicion = useSelector(getSelectedRequisicion);
  let selectedCotizacionCompra = null;
  if (selectedRequisicion) {
    selectedCotizacionCompra = selectedRequisicion.cotizacion_compras;
  }

  return (
    <Modal open={visible} onClose={() => setVisible(false)} centered={false}>
      <Modal.Header>Cotizacion Compras</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <VerCotizacionCompra
            cotizacionCompra={selectedCotizacionCompra}
          ></VerCotizacionCompra>
        </Modal.Description>
        <Divider></Divider>
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

export default ComprasModal;
