import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import SalesData from "./SalesData";

export default class SalesChart extends Component {
  componentDidMount() {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("ChartDiv", am4charts.PieChart);

    // Add data
    chart.data = SalesData;

    // Create axes
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "sales1";
    pieSeries.dataFields.category = "date";
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {
    return (
      <div>
        <div id="ChartDiv" style={{ width: "100%", height: "400px" }}></div>
      </div>
    );
  }
}
