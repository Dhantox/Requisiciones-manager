import React, { useEffect, useState, handleChange, Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid, Input, Menu, Segment } from 'semantic-ui-react';
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
import ComprasModal from './ComprasModal';
import moment from 'moment';
import showNotification from '../../utils/notifications';
import DropdownInput from '../../components/DropdownInput';

const RequisicionesContainer = props => {
  const [modalCotizacionState, setModalCotizacionState] = useState({
    visible: false,
    mode: 'crear'
  });
  const [
    modalCotizacionComprasState,
    setModalCotizacionComprasState
  ] = useState({
    visible: false,
    mode: 'crear'
  });

  const [
    modalEstadoRequisicionVisible,
    setModalEstadoRequisicionVisible
  ] = useState(false);
  const dispatch = useDispatch();
  const [tipoFiltradoRequisicion, setTipoFiltradoRequisicion] = useState({});
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    Requisiciones.requisicionFiltrada(tipoFiltradoRequisicion).then(r => {
      dispatch({ type: 'CARGAR_REQUISICIONES_SUCCESS', payload: r.data });
    });
  }, [dispatch, tipoFiltradoRequisicion]);

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
    orden_proveedor: ''
  };
  if (selectedRequisicion && selectedRequisicion.cotizacion) {
    defaultFormCotizacion = {
      fecha: moment(selectedRequisicion.cotizacion.fecha),
      monto: selectedRequisicion.cotizacion.monto,
      folio: selectedRequisicion.cotizacion.folio,
      orden_proveedor: selectedRequisicion.cotizacion.orden_proveedor
    };
  }
  return (
    <MainContainer
      title="Requisiciones"
      optionsButtons={
        <>
          <Grid columns={4} textAlign={'left'}>
            <Grid.Column verticalAlign={'bottom'} width={3}>
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
            </Grid.Column>
            {/* <Grid.Column widht={3}>
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
            <Grid.Column></Grid.Column> */}
          </Grid>
        </>
      }
    >
      <Menu attached="top" tabular>
        <Menu.Item
          name="Todas"
          setVisible={() => setVisible(true)}
          active={true}
          onClick={setVisible}
        />
        <Menu.Item
          name="Pendientes"
          setVisible={() => setVisible(!visible)}
          active={false}
          onClick={setVisible}
        />
        <Menu.Item
          name="Cotizadas"
          setVisible={() => setVisible(!visible)}
          active={false}
          onClick={setVisible}
        />
        <Menu.Item
          name="Aceptadas"
          setVisible={() => setVisible(!visible)}
          active={false}
          onClick={setVisible}
        />
        <Menu.Menu position="right">
          <Menu.Item position="right">
            <Input
              transparent
              icon={{ name: 'search', link: true }}
              placeholder="Search users..."
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Segment attached="bottom">
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
          onVerCotizacionComprasClick={requisicionId => {
            dispatch({ type: 'SELECT_REQUISICION', payload: requisicionId });
            setModalCotizacionComprasState({
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
      </Segment>
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
          estatus_id: selectedRequisicion ? selectedRequisicion.estatus.id : '',
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
              return Requisiciones.all();
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
      <ComprasModal
        visible={modalCotizacionComprasState.visible}
        mode={modalCotizacionComprasState.mode}
        setVisible={visible =>
          setModalCotizacionComprasState({
            ...modalCotizacionComprasState,
            visible: visible
          })
        }
      ></ComprasModal>
    </MainContainer>
  );
};

RequisicionesContainer.propTypes = {};

export default RequisicionesContainer;
