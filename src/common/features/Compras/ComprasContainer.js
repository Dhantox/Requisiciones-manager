import React, { useEffect, useState, handleChange } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid, Form, Container } from 'semantic-ui-react';
import AgregarRequisicionesModal from './AgregarRequisicionesModal';
import { Requisiciones, Clientes } from '../../../agent';
import TablaRequisiciones from './TablaRequisiciones';
import { getClientes } from '../Clientes/selectors';
import {
  getRequisicionesTipos,
  getSelectedRequisicion,
  getEstadosCategorias,
  getRequisicionesEstatus
} from './selectors';
import AgregarCotizacionModal from './AgregarCotizacionModal';
import EstadoRequisicionModal from './EstadoRequisicionModal';
import moment from 'moment';
import showNotification from '../../utils/notifications';
import DropdownInput from '../../components/DropdownInput';
import { useForm } from '../../hooks/formHooks';

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

  const requisicionesTipos = useSelector(getRequisicionesTipos);
  const clientes = useSelector(getClientes);
  const estatus = useSelector(getRequisicionesEstatus);
  const estadosCategorias = useSelector(getEstadosCategorias);
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
          <TablaRequisiciones
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
              Requisiciones.estados.get(id).then(r =>
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
            data={requesiciones}
          ></TablaRequisiciones>
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
          <EstadoRequisicionModal
            defaultForm={{
              estatus_id: selectedRequisicion
                ? selectedRequisicion.estatus.id
                : '',
              categoria_id: selectedRequisicion
                ? selectedRequisicion.estado.categoria
                : '',
              razon: selectedRequisicion ? selectedRequisicion.estado.razon : ''
            }}
            estadosCategorias={estadosCategorias}
            estatus={estatus}
            visible={modalEstadoRequisicionVisible}
            setVisible={setModalEstadoRequisicionVisible}
            onSubmit={form => {
              dispatch({ type: 'LOADING' });

              Requisiciones.estados
                .update(selectedRequisicion.id, form)
                .then(r => {
                  showNotification.success(
                    'Exito!',
                    'Estado de cotizacion guardado'
                  );
                  return Requisiciones.filtrados();
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

RequisicionesContainer.propTypes = {};

export default RequisicionesContainer;
