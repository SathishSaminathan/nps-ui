import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "screens/Auth/Login";
import Home from "screens/Home";
import DashboardComponent from "components/shared/DashboardComponent";
import WelcomeComponent from "components/shared/WelcomeComponent";
import Survey from "components/Survey";
import Integrations from "components/Integrations";
import TextAnalytics from "components/TextAnalytics";
import TextAnalytics1 from "components/TextAnalytics/TextAnalytics1";
import RawData from "components/Raw Data";
import ProtectedRoute from "./ProtectedRoutes";
import DashboardComponent1 from "components/shared/DashboardComponent/DashboardComponent1";

const MainRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/" component={Home} />
    </Switch>
  );
};

const HomeRoutes = () => {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/dashboardWithData"
        component={DashboardComponent}
      />
      <ProtectedRoute
        exact
        path="/dashboardWithData1"
        component={DashboardComponent1}
      />
      <ProtectedRoute
        exact
        path="/dashboardWithoutData"
        component={WelcomeComponent}
      />
      <ProtectedRoute exact path="/survey" component={Survey} />
      <ProtectedRoute exact path="/rawData" component={RawData} />
      <ProtectedRoute exact path="/integrations" component={Integrations} />
      <ProtectedRoute exact path="/textAnalytics" component={TextAnalytics} />
      <ProtectedRoute exact path="/textAnalytics1" component={TextAnalytics1} />
      {/* <Route path="/dashboardWithoutData" component={WelcomeComponent} /> */}
    </Switch>
  );
};

export { MainRoutes, HomeRoutes };
