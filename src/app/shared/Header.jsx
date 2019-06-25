import React, { useCallback } from "react";
import { useMappedState } from "redux-react-hook";

import moment from "moment";
import { history } from "./history";

import ShopSelector from "./components/ShopSelector";

export default ({ show, shops, hideNavBar = false, match }) => {
  const { path } = match;
  const { shopId } = match.params;
  const mapState = useCallback(
    ({ dateForDailyReport }) => ({ dateForDailyReport }),
    []
  );
  const { dateForDailyReport } = useMappedState(mapState);

  const year = moment(dateForDailyReport).format("YYYY");

  return (
    <div className={`header ${show ? "" : "hide"}`}>
      <div
        className="title"
        onClick={e => {
          history.push(`${process.env.PUBLIC_URL}/total`);
        }}
      >
        <span className="year">{year}</span>
        <span className="text">Reports</span>
      </div>
      <ShopSelector shops={shops} path={path} shop_id={shopId} />
      {!hideNavBar && (
        <div className="navigation">
          <span
            onClick={() => {
              history.push(`${process.env.PUBLIC_URL}/daily`);
            }}
            className={
              path === "/daily" || path === "/daily/:shopId" ? "active" : ""
            }
          >
            daily
          </span>
          <span
            onClick={() => {
              history.push(`${process.env.PUBLIC_URL}/weekly`);
            }}
            className={
              path === "/weekly" || path === "/weekly/:shopId" ? "active" : ""
            }
          >
            weekly
          </span>
          <span
            onClick={() => {
              history.push(`${process.env.PUBLIC_URL}/customize`);
            }}
            className={
              path === "/customize" || path === "/customize/:shopId"
                ? "active"
                : ""
            }
          >
            customize
          </span>
          <span
            onClick={() => {
              history.push(`${process.env.PUBLIC_URL}/all`);
            }}
            className={
              path === "/all" || path === "/all/:shopId" ? "active" : ""
            }
          >
            more
          </span>
        </div>
      )}
    </div>
  );
};
