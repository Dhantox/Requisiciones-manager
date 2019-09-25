import React, { useEffect, useState, handleChange } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import { Requisiciones, Clientes, Reportes } from '../../../agent';
import TablaCotizacionesCompras from './TablaCotizacionesCompras';
import { getSelectedRequisicion, getRequisicionesEstatus } from './selectors';
import AgregarCotizacionModal from './AgregarCotizacionModal';
import AgregarReportesModal from './AgregarReportesModal';
import moment from 'moment';
import showNotification from '../../utils/notifications';
import DropdownInput from '../../components/DropdownInput';

const RequisicionesContainer = props => {
  const [modalCotizacionState, setModalCotizacionState] = useState({
    visible: false,
    mode: 'crear'
  });
  const [
    modalEstadoRequisicionVisible,
    setModalEstadoRequisicionVisible
  ] = useState(false);
  const dispatch = useDispatch();

  const requisicionReporteId = useSelector(store => {
    if (store.requisiciones.selectedRequisicion != null) {
      return store.requisiciones.selectedRequisicion.id;
    }
  });
  useEffect(() => {
    Promise.all([
      Requisiciones.filtrados().then(r => {
        dispatch({ type: 'CARGAR_REQUISICIONES_SUCCESS', payload: r.data });
      }),
      Requisiciones.tipos.all().then(r => {
        dispatch({
          type: 'CARGAR_REQUISICIONES_TIPOS_SUCCESS',
          payload: r.data
        });
      }),
      Requisiciones.estados.categorias.all().then(r => {
        dispatch({
          type: 'CARGAR_REQUISICIONES_ESTADOS_CATEGORIAS_SUCCESS',
          payload: r.data
        });
      }),
      Requisiciones.estatus.all().then(r => {
        dispatch({
          type: 'CARGAR_REQUISICIONES_ESTATUS_SUCCESS',
          payload: r.data
        });
      }),
      Clientes.all().then(r => {
        dispatch({ type: 'CARGAR_CLIENTES_SUCCESS', payload: r.data });
      })
    ]);
  }, [dispatch]);
  const requesiciones = useSelector(store =>
    store.requisiciones.requisiciones.map(cliente => ({ ...cliente }))
  ).map(requisicion => {
    requisicion.fecha_correo = moment(requisicion.fecha_correo);
    return requisicion;
  });

  const estatus = useSelector(getRequisicionesEstatus);
  const selectedRequisicion = useSelector(getSelectedRequisicion);
  let defaultFormCotizacion = {
    fecha: moment(),
    monto: '',
    folio: '',
    proveedores: ''
  };

  if (selectedRequisicion && selectedRequisicion.cotizacion_compras) {
    defaultFormCotizacion = {
      fecha: moment(selectedRequisicion.cotizacion_compras.fecha),
      monto: selectedRequisicion.cotizacion_compras.monto,
      folio: selectedRequisicion.cotizacion_compras.folio,
      proveedores: selectedRequisicion.cotizacion_compras.proveedores
    };
  }
  return (
    <MainContainer
      title="Compras"
      optionsButtons={
        <>
          <Grid columns={4} textAlign={'left'}>
            <Grid.Column widht={3}>
              <DropdownInput
                placeholder="Estatus"
                label="Estatus"
                name="estatus_id"
                valuename="concepto"
                fluid
                onChange={handleChange}
                search
                selection
                options={estatus}
                value={estatus}
                clearable
              ></DropdownInput>
            </Grid.Column>
            <Grid.Column></Grid.Column>
            <Grid.Column></Grid.Column>
          </Grid>
        </>
      }
    >
      <Grid.Row>
        <Grid.Column>
          <TablaCotizacionesCompras
            onAgregarCotizacionComprasClick={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
              setModalCotizacionState({
                mode: 'agregar',
                visible: true
              });
            }}
            onVerCotizacionComprasClick={requisicionId => {
              dispatch({ type: 'SELECT_REQUISICION', payload: requisicionId });
              setModalCotizacionState({
                mode: 'ver',
                visible: true
              });
            }}
            onAgregarReporteClick={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
              Requisiciones.estados.get(id).then(r => {
                dispatch({
                  type: 'CARGAR_REQUISICION_ESTADO',
                  payload: r.data
                });
              });
              setModalEstadoRequisicionVisible(true);
            }}
            onSelectRequisicion={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
            }}
            data={requesiciones}
          ></TablaCotizacionesCompras>
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
              Requisiciones.cotizacionesCompras
                .create(form, selectedRequisicion.id)
                .then(r => Requisiciones.filtrados())
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
          <AgregarReportesModal
            visible={modalEstadoRequisicionVisible}
            setVisible={setModalEstadoRequisicionVisible}
            onSubmit={form => {
              dispatch({ type: 'LOADING' });
              Reportes.create(form, requisicionReporteId)
                .then(r => {
                  showNotification.success(
                    'Exito!',
                    'Estado de cotizacion guardado'
                  );
                  return Reportes.get(requisicionReporteId);
                })
                .then(r => {
                  dispatch({
                    type: 'CARGAR_REPORTES_SUCCESS',
                    payload: r.data
                  });
                })
                .finally(e => dispatch({ type: 'STOP_LOADING' }));
            }}
          ></AgregarReportesModal>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

RequisicionesContainer.propTypes = {};

export default RequisicionesContainer;
