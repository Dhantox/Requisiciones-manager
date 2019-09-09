import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import AgregarRequisicionesModal from './AgregarRequisicionesModal';
import { Requisiciones, Clientes } from '../../../agent';
import TablaRequisiciones from './TablaRequisiciones';
import { getClientes } from '../Clientes/selectors';
import { getRequisicionesTipos, getSelectedRequisicion } from './selectors';
import AgregarCotizacionModal from './AgregarCotizacionModal';

const RequisicionesContainer = props => {
  const [modalCotizacionVisible, setmodalCotizacionVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Requisiciones.all().then(r => {
      dispatch({ type: 'CARGAR_REQUISICIONES_SUCCESS', payload: r.data });
    });
    Requisiciones.tipos.all().then(r => {
      dispatch({ type: 'CARGAR_REQUISICIONES_TIPOS_SUCCESS', payload: r.data });
    });
    Clientes.all().then(r => {
      dispatch({ type: 'CARGAR_CLIENTES_SUCCESS', payload: r.data });
    });
  }, [dispatch]);

  const requesiciones = useSelector(store =>
    store.requisiciones.requisiciones.map(cliente => ({ ...cliente }))
  );
  const requisicionesTipos = useSelector(getRequisicionesTipos);
  const clientes = useSelector(getClientes);
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
            onSelectRequisicion={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
              dispatch({
                type: 'MODAL_REQUISICION_MODO_VER'
              });
              dispatch({ type: 'MODAL_REQUISICION_' });
            }}
            data={requesiciones}
          ></TablaRequisiciones>
          <AgregarCotizacionModal
            visible={modalCotizacionVisible}
            setVisible={setmodalCotizacionVisible}
            onSubmit={form =>
              Requisiciones.cotizaciones
                .create(form, selectedRequisicion)
                .then(r => Requisiciones.all())
                .then(r =>
                  dispatch({
                    type: 'CARGAR_REQUISICIONES_SUCCESS',
                    payload: r.data
                  })
                )
            }
          ></AgregarCotizacionModal>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

RequisicionesContainer.propTypes = {};

export default RequisicionesContainer;
