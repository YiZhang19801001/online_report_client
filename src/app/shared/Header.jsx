import React, { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

import moment from "moment";
import { history } from "./history";

import ShopSelector from "./components/ShopSelector";
import userAuth from "./userAuth";
import arrow from "../pictures/arrow.png";
import user from "../pictures/user.png";

export default ({ show, shops, hideNavBar = false, match, showAgent = false, currentTag, setShowAgent }) => {
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
              (currentTag === 'agent' && showAgent && path === `${process.env.PUBLIC_URL}/total`) ?
                <img
                  src={arrow}
                  alt=""
                  onClick={() => {
                    setShowAgent(false);
                  }}
                />
                :
                <div style={{ width: "1.6rem", height: "2rem" }} />
            )}
        </div>
        <div className="title">
          <span className="year">{year}</span>
          <span className="text">Reports</span>
        </div>

        <div className={`icon-container`}>
          <img
            src={user}
            alt=""
            onClick={() => {
              dispatch({ type: "showUserCenter" });
            }}
          />
        </div>
      </div>
      {path !== `${process.env.PUBLIC_URL}/total` && (
        <ShopSelector shops={shops} path={path} shop_id={shopId} />
      )}
      {!hideNavBar && (
        <div className="navigation">
          {
            userAuth().user_type === 'GIFTSHOPHEAD' && (
              <span
                onClick={() => {
                  if (shopId) {
                    history.push(`${process.env.PUBLIC_URL}/group/${shopId}`);
                  } else {
                    history.push(`${process.env.PUBLIC_URL}/group`);
                  }
                }}
                className={
                  path === `${process.env.PUBLIC_URL}/group` ||
                    path === `${process.env.PUBLIC_URL}/group/:shopId`
                    ? "active"
                    : ""
                }
              >
                Group
            </span>
            )
          }
          {
            userAuth().user_type === 'GIFTSHOPHEAD' && (
              <span
                onClick={() => {
                  if (shopId) {
                    history.push(`${process.env.PUBLIC_URL}/staff/${shopId}`);
                  } else {
                    history.push(`${process.env.PUBLIC_URL}/staff`);
                  }
                }}
                className={
                  path === `${process.env.PUBLIC_URL}/staff` ||
                    path === `${process.env.PUBLIC_URL}/staff/:shopId`
                    ? "active"
                    : ""
                }
              >
                Staff
            </span>
            )
          }
          <span
            onClick={() => {
              if (shopId) {
                history.push(`${process.env.PUBLIC_URL}/daily/${shopId}`);
              } else {
                history.push(`${process.env.PUBLIC_URL}/daily`);
              }
            }}
            className={
              path === `${process.env.PUBLIC_URL}/daily` ||
                path === `${process.env.PUBLIC_URL}/daily/:shopId`
                ? "active"
                : ""
            }
          >
            daily
          </span>
          <span
            onClick={() => {
              if (shopId) {
                history.push(`${process.env.PUBLIC_URL}/weekly/${shopId}`);
              } else {
                history.push(`${process.env.PUBLIC_URL}/weekly`);
              }
            }}
            className={
              path === `${process.env.PUBLIC_URL}/weekly` ||
                path === `${process.env.PUBLIC_URL}/weekly/:shopId`
                ? "active"
                : ""
            }
          >
            weekly
          </span>
          {userAuth().tables_report && (
            <span
              onClick={() => {
                if (shopId) {
                  history.push(`${process.env.PUBLIC_URL}/customize/${shopId}`);
                } else {
                  history.push(`${process.env.PUBLIC_URL}/customize`);
                }
              }}
              className={
                path === `${process.env.PUBLIC_URL}/customize` ||
                  path === `${process.env.PUBLIC_URL}/customize/:shopId`
                  ? "active"
                  : ""
              }
            >
              table
            </span>
          )}
          {userAuth().export_report && (
            <span
              onClick={() => {
                if (shopId) {
                  history.push(`${process.env.PUBLIC_URL}/export/${shopId}`);
                } else {
                  history.push(`${process.env.PUBLIC_URL}/export`);
                }
              }}
              className={
                path === `${process.env.PUBLIC_URL}/export` ||
                  path === `${process.env.PUBLIC_URL}/export/:shopId`
                  ? "active"
                  : ""
              }
            >
              export
            </span>
          )}
          <span
            onClick={() => {
              if (shopId) {
                history.push(`${process.env.PUBLIC_URL}/all/${shopId}`);
              } else {
                history.push(`${process.env.PUBLIC_URL}/all`);
              }
            }}
            className={
              path === `${process.env.PUBLIC_URL}/all` ||
                path === `${process.env.PUBLIC_URL}/all/:shopId`
                ? "active"
                : ""
            }
          >
            more
          </span>
        </div>
      )}
    </div>
  );
};
