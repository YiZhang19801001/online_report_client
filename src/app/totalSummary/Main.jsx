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
    case "setTag":
      return { ...state, currentTag: action.payload }
    default:
      break;
  }
};

const zone = "Australia/Sydney";

const initState = {
  isLoading: true,
  date: {
    startDate: moment.utc()
      .add("minutes", zone)
      .startOf("day"),
    endDate: moment.utc()
      .endOf("day")
      .add("minutes", zone)
  },
  currentTag: 'shop',
};

export default props => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { isLoading, date, currentTag } = state;
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
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <div className={`header-container`}>
          <div className={currentTag === 'shop' ? `border sub-container` : 'sub-container'} onClick={() => dispatch({ type: 'setTag', payload: 'shop' })}>
            <span >Shop</span>
          </div>
          <div className={currentTag === 'group' ? `border sub-container` : 'sub-container'} onClick={() => dispatch({ type: 'setTag', payload: 'group' })}>
            <span>Group</span>
          </div>
          <div className={currentTag === 'agent' ? `border sub-container` : 'sub-container'} onClick={() => dispatch({ type: 'setTag', payload: 'agent' })}>
            <span>Agent</span>
          </div>
        </div>
      </div>
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
            console.log({ date: moment(e.target.value).endOf("day") });
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
            <div className="title">Sales:</div>
            <div className="value">
              ${parseFloat(getTotalSales()).toFixed(2)}
            </div>
          </div>
          <div className="total-summary__tx">
            <div className="title">Transactions:</div>
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
