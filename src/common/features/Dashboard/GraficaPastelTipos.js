import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

export default class ChartTipos extends Component {
  constructor(props) {
    super(props);
    am4core.useTheme(am4themes_animated);
    let chart;
    let title;
    let pieSeries;
    this.state = { chart, pieSeries };
  }

  componentDidMount() {
    am4core.useTheme(am4themes_animated);
    // Create axes
    this.chart = am4core.create('ChartTipos', am4charts.PieChart);
    this.title = this.chart.titles.create();
    this.title.text = 'Tipos de cotizaciones';
    this.title.fontSize = 15;
    this.title.marginBottom = 20;
    this.pieSeries = this.chart.series.push(new am4charts.PieSeries());
    this.pieSeries.dataFields.value = 'total';
    this.pieSeries.dataFields.category = 'tipo';
  }

  componentDidUpdate() {
    console.log(this.props.data);
    am4core.useTheme(am4themes_animated);
    // Create axe
    if (this.props.data != undefined || this.props.data != null) {
      this.chart.data = this.props.data;
    }
    this.pieSeries.dataFields.value = 'total';
    this.pieSeries.dataFields.category = 'tipo';
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {
    return (
      <div>
        <div id="ChartTipos" style={{ width: '100%', height: '250px' }}></div>
      </div>
    );
  }
}
