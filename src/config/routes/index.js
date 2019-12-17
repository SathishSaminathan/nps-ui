import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "screens/Auth/Login";
import Home from "screens/Home";

const MainRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  );
};

export { MainRoutes };
