import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";

import "./App.css";
import { MainRoutes } from "config/routes";

class App extends Component {
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
