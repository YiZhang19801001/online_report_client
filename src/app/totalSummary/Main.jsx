import React, { useReducer } from "react";
import { uniqueId } from "lodash";
import { Header, Loading } from "../shared";
import moment from "moment";
import { fetchReports } from "./hooks";
import { ShopSummaryCard } from "./components";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    case "setDate":
      return { ...state, date: { ...state.date, ...action.payload } };
    default:
      break;
  }
};

const zone = "Australia/Sydney";

const initState = {
  isLoading: true,
  date: {
    startDate: moment
      .utc()
      .add("minutes", "Australia/Sydney")
      .startOf("day"),
    endDate: moment
      .utc()
      .endOf("day")
      .add("minutes", zone)
  }
};

export default props => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { isLoading, date } = state;
  const { startDate, endDate } = date;

  const reports = fetchReports(date, dispatch);

  const getTotalSales = () =>
    reports.reduce((sum, report) => sum + parseFloat(report.totalSales || 0), 0);

  const getTotalTx = () =>
    reports.reduce((sum, report) => sum + parseInt(report.totalTx || 0), 0);

  return (
    <>
      <Header show={true} hideNavBar={true} {...props} />
      {isLoading && <Loading />}
      <div className={`date-picker`}>
        <input
          type="date"
          value={startDate.format("YYYY-MM-DD")}
          max={endDate.format("YYYY-MM-DD")}
          onChange={e => {
            dispatch({
              type: "setDate",
              payload: { startDate: moment(e.target.value).startOf("day") }
            });
          }}
        />

        <input
          type="date"
          value={endDate.format("YYYY-MM-DD")}
          min={startDate.format("YYYY-MM-DD")}
          onChange={e => {
            dispatch({
              type: "setDate",
              payload: { endDate: moment(e.target.value).endOf("day") }
            });
          }}
        />
      </div>
      <div className="component-total-report">
        <div className="total-summary">
          <div className="total-summary__sales">
            <div className="title">sales:</div>
            <div className="value">
              ${parseFloat(getTotalSales()).toFixed(2)}
            </div>
          </div>
          <div className="total-summary__tx">
            <div className="title">transactions:</div>
            <div className="value">{getTotalTx()}</div>
          </div>
        </div>
        <div className="shop-list">
          {reports.map(report => {
            return (
              <ShopSummaryCard report={report} key={uniqueId("shopSummary")} />
            );
          })}
        </div>
      </div>
    </>
  );
};
