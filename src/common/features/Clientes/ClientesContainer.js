import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import AgregarClientesModal from './AgregarClientesModal';
import { Clientes } from '../../../agent';
import TablaClientes from './TablaClientes';

const ClientesContainer = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    Clientes.all().then(r => {
      dispatch({ type: 'CARGAR_CLIENTES_SUCCESS', payload: r.data });
    });
  }, []);
  const clientes = useSelector(store =>
    store.clientes.clientes.map(cliente => ({ ...cliente }))
  );
  return (
    <MainContainer
      title="Clientes"
      optionsButtons={
        <>
          <AgregarClientesModal
            onSubmit={cliente =>
              Clientes.create(cliente)
                .then(r => Clientes.get())
                .then(r =>
                  dispatch({ type: 'CARGAR_CLIENTES_SUCCESS', payload: r.data })
                )
            }
          ></AgregarClientesModal>
        </>
      }
    >
      <Grid.Row>
        <Grid.Column>
          <TablaClientes data={clientes}></TablaClientes>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

ClientesContainer.propTypes = {};

export default ClientesContainer;
