import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import "./App.css";
import { MainRoutes } from "config/routes";

class App extends Component {
  componentDidMount() {
    // this.props.history.push("/login");
    // Chart.plugins.unregister(ChartDataLabels);// for unregistering global chartdatalabels
  }
  render() {
    return (
      <Fragment>
        <MainRoutes />
      </Fragment>
    );
  }
}

const RouteWithAuth = withRouter(App);

export default RouteWithAuth;
