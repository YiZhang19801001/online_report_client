import React, { useReducer } from "react";
// import { uniqueId } from "lodash";
import { Header, Loading } from "../shared";
import moment from "moment";
import { fetchReports } from "./hooks";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    default:
      break;
  }
};

const initState = {
  isLoading: true,
  date: {
    startDate: moment(),
    endDate: moment()
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { isLoading, date } = state;
  const { startDate, endDate } = date;

  const reports = fetchReports(date, dispatch);

  return (
    <>
      <Header show={true} hideNavBar={true} />
      <div className="component-total-report">
        {isLoading && <Loading />}
        sales: {"totalSales"}
      </div>
    </>
  );
};
