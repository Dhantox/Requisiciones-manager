import React, { useEffect, useState, handleChange } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid, Form, Container } from 'semantic-ui-react';
import AgregarRequisicionesModal from './AgregarRequisicionesModal';
import { Reportes, Clientes } from '../../../agent';
import TablaReportes from './TablaReportes';
import { getClientes } from '../Clientes/selectors';
import { getSelectedReporte } from './selectors';
import AgregarCotizacionModal from './AgregarCotizacionModal';
import EstadoRequisicionModal from './EstadoRequisicionModal';
import moment from 'moment';
import showNotification from '../../utils/notifications';
import DropdownInput from '../../components/DropdownInput';
import { useForm } from '../../hooks/formHooks';

const ReportesContainer = props => {
  const [modalCotizacionState, setModalCotizacionState] = useState({
    visible: false,
    mode: 'crear'
  });
  const [
    modalEstadoRequisicionVisible,
    setModalEstadoRequisicionVisible
  ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      Reportes.all().then(r => {
        dispatch({ type: 'CARGAR_REPORTES_SUCCESS', payload: r.data });
      }),
      Clientes.all().then(r => {
        dispatch({ type: 'CARGAR_CLIENTES_SUCCESS', payload: r.data });
      })
    ]);
  }, [dispatch]);

  const reportes = useSelector(store =>
    store.reportes.reportes.map(reporte => ({ ...reporte }))
  );

  console.log(reportes);
  const selectedReporte = useSelector(getSelectedReporte);
  let defaultFormCotizacion = {
    fecha: moment(),
    monto: '',
    folio: '',
    orden_proveedor: ''
  };
  return (
    <MainContainer title="Reportes  " optionsButtons={<></>}>
      <Grid.Row>
        <Grid.Column>
          <TablaReportes
            onAgregarCotizacionClick={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
              setModalCotizacionState({
                mode: 'agregar',
                visible: true
              });
            }}
            onVerCotizacionClick={requisicionId => {
              dispatch({ type: 'SELECT_REQUISICION', payload: requisicionId });
              setModalCotizacionState({
                mode: 'ver',
                visible: true
              });
            }}
            onCambiarEstatusClick={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
              Reportes.estados.get(id).then(r =>
                dispatch({
                  type: 'CARGAR_REQUISICION_ESTADO',
                  payload: r.data
                })
              );
              setModalEstadoRequisicionVisible(true);
            }}
            onSelectRequisicion={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
            }}
            data={reportes}
          ></TablaReportes>
          <AgregarCotizacionModal
            visible={modalCotizacionState.visible}
            mode={modalCotizacionState.mode}
            setVisible={visible =>
              setModalCotizacionState({
                ...modalCotizacionState,
                visible: visible
              })
            }
            defaultForm={defaultFormCotizacion}
            onSubmit={form =>
              Reportes.requisiciones
                .create(form, selectedReporte.id)
                .then(r => Reportes.all())
                .then(r => {
                  dispatch({
                    type: 'CARGAR_REQUISICIONES_SUCCESS',
                    payload: r.data
                  });
                  showNotification.success(
                    'Cotización creada!',
                    'La cotización ha sido creada exitosamente'
                  );
                })
                .catch(e =>
                  showNotification.error(
                    'Registro fallido',
                    'Ha ocurrido un problema al crear la cotización'
                  )
                )
            }
          ></AgregarCotizacionModal>
          <EstadoRequisicionModal
            defaultForm={{
              estatus_id: selectedReporte ? selectedReporte.estatus.id : '',
              categoria_id: selectedReporte
                ? selectedReporte.estado.categoria
                : '',
              razon: selectedReporte ? selectedReporte.estado.razon : ''
            }}
            visible={modalEstadoRequisicionVisible}
            setVisible={setModalEstadoRequisicionVisible}
            onSubmit={form => {
              dispatch({ type: 'LOADING' });

              Reportes.estados
                .update(selectedReporte.id, form)
                .then(r => {
                  showNotification.success(
                    'Exito!',
                    'Estado de cotizacion guardado'
                  );
                  return Reportes.all();
                })
                .then(r => {
                  dispatch({
                    type: 'CARGAR_REQUISICIONES_SUCCESS',
                    payload: r.data
                  });
                })
                .finally(e => dispatch({ type: 'STOP_LOADING' }));
            }}
          ></EstadoRequisicionModal>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

ReportesContainer.propTypes = {};

export default ReportesContainer;
