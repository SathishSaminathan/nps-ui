import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import "./App.css";
import { MainRoutes } from "config/routes";

class App extends Component {
  componentDidMount() {
    if (!this.checkForUser()) {
      this.props.history.push("/login");
    }
    // this.props.history.push("/login");
    // Chart.plugins.unregister(ChartDataLabels);// for unregistering global chartdatalabels
  }

  checkForUser = () => localStorage.getItem("user");
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
