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
      <ProtectedRoute path="/dashboardWithData" component={DashboardComponent} />
      <ProtectedRoute path="/dashboardWithoutData" component={WelcomeComponent} />
      <ProtectedRoute path="/survey" component={Survey} />
      <ProtectedRoute path="/rawData" component={RawData} />
      <ProtectedRoute path="/integrations" component={Integrations} />
      <ProtectedRoute path="/textAnalytics" component={TextAnalytics} />
      <ProtectedRoute path="/textAnalytics1" component={TextAnalytics1} />
      {/* <Route path="/dashboardWithoutData" component={WelcomeComponent} /> */}
    </Switch>
  );
};

export { MainRoutes, HomeRoutes };
