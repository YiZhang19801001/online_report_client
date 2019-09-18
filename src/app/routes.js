import React from "react";
import { Route, Router } from "react-router-dom";
import { history } from "./shared";
import { DailySummary } from "./summary";
import { WeeklyReport } from "./weekly";
import { AllReports } from "./all";
import { CustomReport } from "./customize";
import { Login } from "./auth";
import { TotalSummary } from "./totalSummary";
import ExportReport from "./exportReport";
import { Group } from "./group";
import { Staff } from "./staff";

export default () => {
  return (
    <Router history={history}>
      <>
        <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
        <Route
          path={`${process.env.PUBLIC_URL}/total`}
          component={TotalSummary}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/daily/:shopId`}
          component={DailySummary}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/daily`}
          component={DailySummary}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/weekly/:shopId`}
          component={WeeklyReport}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/weekly`}
          component={WeeklyReport}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/customize/:shopId`}
          component={CustomReport}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/customize`}
          component={CustomReport}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/export/:shopId`}
          component={ExportReport}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/export`}
          component={ExportReport}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/all/:shopId`}
          component={AllReports}
        />


        <Route
          exact
          path={`${process.env.PUBLIC_URL}/all`}
          component={AllReports}
        />


        <Route
          path={`${process.env.PUBLIC_URL}/group/:shopId`}
          component={Group}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/group`}
          component={Group}
        />

        <Route
          path={`${process.env.PUBLIC_URL}/staff/:shopId`}
          component={Staff}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/staff`}
          component={Staff}
        />

      </>
    </Router>
  );
};
