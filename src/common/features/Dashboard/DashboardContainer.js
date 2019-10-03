import React from "react";
import MainContainer from "../../components/MainContainer";
import SalesChart from "./TablaGraficas";
import ChartDiv from "./TablaGraficaPastel";
import RequisicionesTotales from "./RequisicionesTotales";
import { Grid } from "semantic-ui-react";

const DashboardContainer = props => {
  return (
    <MainContainer title={"Dashboard"}>
      <RequisicionesTotales></RequisicionesTotales>
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
