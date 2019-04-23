import React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "./shared";
import { DailySummary } from "./summary";
import { WeeklyReport } from "./weekly";
import { MonthlyReport } from "./monthly";
import { CustomReport } from "./customize";
export default () => {
  return (
    <Router history={history}>
      <>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          component={DailySummary}
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
          path={`${process.env.PUBLIC_URL}/monthly`}
          component={MonthlyReport}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/customize`}
          component={CustomReport}
        />
      </>
    </Router>
  );
};
