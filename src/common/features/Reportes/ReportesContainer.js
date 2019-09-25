import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Reportes } from '../../../agent';
import TablaReportes from './TablaReportes';

const ReportesContainer = props => {
  const dispatch = useDispatch();

  const reportes = useSelector(store =>
    store.reportes.reportes.map(reporte => ({ ...reporte }))
  );

  const requisicionId = useSelector(store => {
    if (store.requisiciones.selectedRequisicion != null) {
      return store.requisiciones.selectedRequisicion.id;
    }
  });
  useEffect(() => {
    if (requisicionId) {
      Promise.all([
        Reportes.get(requisicionId).then(r => {
          dispatch({ type: 'CARGAR_REPORTES_SUCCESS', payload: r.data });
        })
      ]);
    }
  }, [dispatch, requisicionId]);

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
