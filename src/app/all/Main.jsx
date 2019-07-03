import React, { useReducer } from "react";
import {
  ReportTypeSelector,
  QuickDatePicker,
  TimePeriodSelector
} from "./components";
import { useReports } from "./hooks";
import { Header, Table, Loading } from "../shared";
import moment from "moment";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const initialState = {
  startDate: moment
    .utc()
    .add("minutes", "Australia/Sydney")
    .startOf("day"),
  endDate: moment
    .utc()
    .add("minutes", "Australia/Sydney")
    .endOf("day"),
  reportType: "category",
  isLoading: true
};

export default props => {
  const { shopId } = props.match.params;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { startDate, endDate, reportType, isLoading } = state;

  const reports = useReports(startDate, endDate, reportType, shopId, dispatch);

  const { data, ths, dataFormat } = reports;

  return (
    <>
      <Header show={true} {...props} />
      <div className="component-custom-report">
        <ReportTypeSelector dispatch={dispatch} reportType={reportType} />
        <QuickDatePicker dispatch={dispatch} />
        <TimePeriodSelector
          dispatch={dispatch}
          startDate={startDate}
          endDate={endDate}
        />
        <div className={`flat-block`}>
          {isLoading ? (
            <Loading />
          ) : (
            <Table
              ths={ths}
              dataFormat={dataFormat}
              data={data}
              sum={false}
              striped={true}
            />
          )}
        </div>
      </div>
    </>
  );
};
