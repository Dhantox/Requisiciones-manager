import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import AgregarRequisicionesModal from './AgregarRequisicionesModal';
import { Requisiciones } from '../../../agent';
import TablaRequisiciones from './TablaRequisiciones';

const RequisicionesContainer = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    Requisiciones.all().then(r => {
      dispatch({ type: 'CARGAR_Requisiciones_SUCCESS', payload: r.data });
    });
  }, [dispatch]);
  const requesiciones = useSelector(store =>
    store.requisiciones.requisiciones.map(cliente => ({ ...cliente }))
  );
  return (
    <MainContainer
      title="Requisiciones"
      optionsButtons={
        <>
          <AgregarRequisicionesModal
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
