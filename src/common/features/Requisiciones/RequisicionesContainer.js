import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
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

const RequisicionesContainer = props => {
  const [modalCotizacionVisible, setmodalCotizacionVisible] = useState(false);
  const [
    modalEstadoRequisicionVisible,
    setModalEstadoRequisicionVisible
  ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([
      Requisiciones.all().then(r => {
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

  return (
    <MainContainer
      title="Requisiciones"
      optionsButtons={
        <>
          <AgregarRequisicionesModal
            clientes={clientes}
            requisicionesTipos={requisicionesTipos}
            onSubmit={cliente =>
              Requisiciones.create(cliente)
                .then(r => Requisiciones.all())
                .then(r =>
                  dispatch({
                    type: 'CARGAR_REQUISICIONES_SUCCESS',
                    payload: r.data
                  })
                )
            }
          ></AgregarRequisicionesModal>
        </>
      }
    >
      <Grid.Row>
        <Grid.Column>
          <TablaRequisiciones
            onAgregarCotizacionClick={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
              setmodalCotizacionVisible(true);
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
            visible={modalCotizacionVisible}
            setVisible={setmodalCotizacionVisible}
            onSubmit={form =>
              Requisiciones.cotizaciones
                .create(form, selectedRequisicion.id)
                .then(r => Requisiciones.all())
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
                .catch(
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
            onSubmit={form =>
              Requisiciones.cotizaciones
                .create(form, selectedRequisicion.id)
                .then(r => Requisiciones.all())
                .then(r =>
                  dispatch({
                    type: 'CARGAR_REQUISICIONES_SUCCESS',
                    payload: r.data
                  })
                )
            }
          ></EstadoRequisicionModal>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

RequisicionesContainer.propTypes = {};

export default RequisicionesContainer;
