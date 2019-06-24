import React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "./shared";
import { DailySummary } from "./summary";
import { WeeklyReport } from "./weekly";
import { AllReports } from "./all";
import { CustomReport } from "./customize";
import { Login } from "./auth";
import { TotalSummary } from "./totalSummary";
export default () => {
  return (
    <Router history={history}>
      <>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          component={DailySummary}
        />
        <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
        <Route
          path={`${process.env.PUBLIC_URL}/total`}
          component={TotalSummary}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/daily`}
          component={DailySummary}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/weekly`}
          component={WeeklyReport}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/customize`}
          component={CustomReport}
        />
        <Route path={`${process.env.PUBLIC_URL}/all`} component={AllReports} />
      </>
    </Router>
  );
};
