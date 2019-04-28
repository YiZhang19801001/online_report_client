import React, { useCallback } from "react";
import { useMappedState } from "redux-react-hook";

import moment from "moment";
import { history } from "./history";

import ShopSelector from "./components/ShopSelector";

export default ({ show, shop }) => {
  const { pathname } = history.location;
  const mapState = useCallback(
    ({ dateForDailyReport }) => ({ dateForDailyReport }),
    []
  );
  const { dateForDailyReport } = useMappedState(mapState);

  const year = moment(dateForDailyReport).format("YYYY");

  return (
    <div className={`header ${show ? "" : "hide"}`}>
      <div className="title">
        <span className="year">{year}</span>
        <span className="text">Reports</span>
      </div>
      <ShopSelector shop={shop} />
      <div className="navigation">
        <span
          onClick={() => {
            history.push(`${process.env.PUBLIC_URL}/daily`);
          }}
          className={pathname === "/daily" ? "active" : ""}
        >
          daily
        </span>
        <span
          onClick={() => {
            history.push(`${process.env.PUBLIC_URL}/weekly`);
          }}
          className={pathname === "/weekly" ? "active" : ""}
        >
          weekly
        </span>
        <span
          onClick={() => {
            history.push(`${process.env.PUBLIC_URL}/monthly`);
          }}
          className={pathname === "/transaction" ? "active" : ""}
        >
          transaction
        </span>
        <span
          onClick={() => {
            history.push(`${process.env.PUBLIC_URL}/customize`);
          }}
          className={pathname === "/more" ? "active" : ""}
        >
          more
        </span>
      </div>
    </div>
  );
};
