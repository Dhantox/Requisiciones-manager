import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import { Grid } from 'semantic-ui-react';
import AgregarProveedoresModal from './AgregarProveedoresModal';
import { Proveedores } from '../../../agent';
import TablaProveedores from './TablaProveedores';

const ProveedoresContainer = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    Proveedores.all().then(r => {
      dispatch({ type: 'CARGAR_PROVEEDORES_SUCCESS', payload: r.data });
    });
  }, [dispatch]);
  const proveedores = useSelector(store =>
    store.proveedores.proveedores.map(proveedor => ({ ...proveedor }))
  );
  return (
    <MainContainer
      title="Proveedores"
      optionsButtons={
        <>
          <AgregarProveedoresModal
            onSubmit={proveedor =>
              Proveedores.create(proveedor)
                .then(r => Proveedores.all())
                .then(r =>
                  dispatch({
                    type: 'CARGAR_PROVEEDORES_SUCCESS',
                    payload: r.data
                  })
                )
            }
          ></AgregarProveedoresModal>
        </>
      }
    >
      <Grid.Row>
        <Grid.Column>
          <TablaProveedores data={proveedores}></TablaProveedores>
        </Grid.Column>
      </Grid.Row>
    </MainContainer>
  );
};

ProveedoresContainer.propTypes = {};

export default ProveedoresContainer;
