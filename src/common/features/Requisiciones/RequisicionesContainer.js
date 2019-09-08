import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import AgregarRequisicionesModal from './AgregarRequisicionesModal';
import { Requisiciones, Clientes } from '../../../agent';
import TablaRequisiciones from './TablaRequisiciones';
import { getClientes } from '../Clientes/selectors';
import { getRequisicionesTipos } from './selectors';

const RequisicionesContainer = props => {
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
          <TablaRequisiciones data={requesiciones}></TablaRequisiciones>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

RequisicionesContainer.propTypes = {};

export default RequisicionesContainer;
