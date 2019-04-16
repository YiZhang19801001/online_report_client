import React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "./shared";
import { DailySummary } from "./summary";
export default () => {
  return (
    <Router history={history}>
      <>
        <Route path={`${process.env.PUBLIC_URL}/`} component={DailySummary} />
      </>
    </Router>
  );
};
