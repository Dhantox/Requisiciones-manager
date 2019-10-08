import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../components/MainContainer';
import SalesChart from './TablaGraficas';
import ChartTipos from './GraficaPastelTipos';
import ChartCategorias from './GraficaPastelCategorias';
import RequisicionesTotales from './RequisicionesTotales';
import { Grid } from 'semantic-ui-react';
import { Requisiciones } from '../../../agent';
import {
  getTotalRequisiciones,
  getTotalCategorias,
  getTotalTipos
} from './selectors';

const DashboardContainer = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([
      Requisiciones.totalRequisiciones().then(r => {
        dispatch({
          type: 'CARGAR_TOTAL_REQUISICIONES',
          payload: r.data
        });
      }),
      Requisiciones.totalCategorias().then(r => {
        dispatch({
          type: 'CARGAR_TOTAL_CATEGORIAS',
          payload: r.data
        });
      }),
      Requisiciones.totalTipos().then(r => {
        dispatch({
          type: 'CARGAR_TOTAL_TIPOS',
          payload: r.data
        });
      })
    ]);
  }, []);
  const totalRequisiciones = useSelector(getTotalRequisiciones);
  const totalCategorias = useSelector(getTotalCategorias);
  const totalTipos = useSelector(getTotalTipos);
  return (
    <MainContainer title={'Dashboard'}>
      <RequisicionesTotales data={totalRequisiciones}></RequisicionesTotales>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Grid.Column>
              <ChartCategorias data={totalCategorias}></ChartCategorias>
            </Grid.Column>
            <Grid.Column>
              <ChartTipos data={totalTipos}></ChartTipos>
            </Grid.Column>
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
