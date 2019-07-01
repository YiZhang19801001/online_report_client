import React, { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

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
  const dispatch = useDispatch();
  const year = moment(dateForDailyReport).format("YYYY");

  return (
    <div className={`header ${show ? "" : "hide"}`}>
      <div className={`header-title`}>
        <div className={`icon-container`}>
          {JSON.parse(localStorage.getItem("aupos_online_report_user")).shops
            .length > 1 && path !== `${process.env.PUBLIC_URL}/total` ? (
            <img
              src="http://kidsnparty.com.au/roben_api/images/homepage.png"
              alt=""
              onClick={() => {
                history.push(`${process.env.PUBLIC_URL}/total`);
              }}
            />
          ) : (
            <div style={{ width: "1.6rem", height: "2rem" }} />
          )}
        </div>
        <div className="title">
          <span className="year">{year}</span>
          <span className="text">Reports</span>
        </div>

        <div className={`icon-container`}>
          <img
            src="http://kidsnparty.com.au/roben_api/images/user.png"
            alt=""
            onClick={() => {
              dispatch({ type: "showUserCenter" });
            }}
          />
        </div>
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
