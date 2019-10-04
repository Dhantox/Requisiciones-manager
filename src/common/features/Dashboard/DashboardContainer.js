import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import SalesChart from './TablaGraficas';
import ChartDiv from './TablaGraficaPastel';
import RequisicionesTotales from './RequisicionesTotales';
import { Grid } from 'semantic-ui-react';
import { Requisiciones } from '../../../agent';
import { getTotalRequisiciones } from './selectors';

const DashboardContainer = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([
      Requisiciones.all().then(r => {
        dispatch({ type: 'CARGAR_REQUISICIONES_SUCCESS', payload: r.data });
      }),
      Requisiciones.totalRequisiciones().then(r => {
        dispatch({
          type: 'CARGAR_TOTAL_REQUISICIONES',
          payload: r.data
        });
      })
    ]);
  }, []);
  const totalRequisiciones = useSelector(getTotalRequisiciones);
  if (totalRequisiciones == null) {
    console.log(totalRequisiciones);
  }

  return (
    <MainContainer title={'Dashboard'}>
      <RequisicionesTotales data={totalRequisiciones}></RequisicionesTotales>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <ChartDiv></ChartDiv>
          </Grid.Column>
          <Grid.Column>
            <SalesChart></SalesChart>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MainContainer>
  );
};
export default DashboardContainer;
