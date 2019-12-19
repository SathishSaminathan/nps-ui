import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "screens/Auth/Login";
import Home from "screens/Home";
import DashboardComponent from "components/shared/DashboardComponent";
import WelcomeComponent from "components/shared/WelcomeComponent";
import Survey from "components/Survey";
import Integrations from "components/Integrations";
import TextAnalytics from "components/TextAnalytics";

const MainRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

const HomeRoutes = () => {
  return (
    <Switch>
      <Route path="/dashboardWithData" component={DashboardComponent} />
      <Route path="/dashboardWithoutData" component={WelcomeComponent} />
      <Route path="/survey" component={Survey} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/textAnalytics" component={TextAnalytics} />
      {/* <Route path="/dashboardWithoutData" component={WelcomeComponent} /> */}
    </Switch>
  );
};

export { MainRoutes, HomeRoutes };
