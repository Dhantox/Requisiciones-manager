import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Reportes } from '../../../agent';
import TablaReportes from './TablaReportes';

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

  const reportes = useSelector(store =>
    store.reportes.reportes.map(reporte => ({ ...reporte }))
  );

  const cotizacionCompraId = useSelector(store => {
    if (
      store.requisiciones.selectedRequisicion != null &&
      store.requisiciones.selectedRequisicion.cotizacion_compras
    ) {
      return store.requisiciones.selectedRequisicion.cotizacion_compras.id;
    }
  });
  useEffect(() => {
    if (cotizacionCompraId) {
      Promise.all([
        Reportes.get(cotizacionCompraId).then(r => {
          dispatch({ type: 'CARGAR_REPORTES_SUCCESS', payload: r.data });
        })
      ]);
    }
  }, [dispatch, cotizacionCompraId]);

  return (
    <Grid.Column title="Reportes" optionsButtons={<></>}>
      <Grid.Row>
        <Grid.Column>
          <TablaReportes
            onSelectRequisicion={id => {
              dispatch({ type: 'SELECT_REQUISICION', payload: id });
            }}
            data={reportes}
          ></TablaReportes>
        </Grid.Column>
      </Grid.Row>
    </Grid.Column>
  );
};

ReportesContainer.propTypes = {};

export default ReportesContainer;
