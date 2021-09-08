import { Switch, Route } from "react-router-dom";
import { memo } from "react";
import { Dashboard } from "../component/Dashboard";
import { Login } from "../component/Login";
import { Footer } from "../component/Footer";

export const Router = memo(() => {
  return (
    <Switch>
      <Route exact path="login">
        <Login />
      </Route>
      <Route exact path="/">
        <Dashboard />
        <Footer />
      </Route>
    </Switch>
  );
});
