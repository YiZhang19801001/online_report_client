import React from "react";
import moment from "moment";

export default ({ dispatch }) => {
  return (
    <div className="flat-block date-picker-container">
      <button
        onClick={e => {
          e.preventDefault();
          dispatch({
            type: "setState",
            payload: {
              startDate: moment()
                .subtract(7, "days")
                .startOf("day"),
              endDate: moment().endOf("day")
            }
          });
        }}
      >
        last 7 days
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          dispatch({
            type: "setState",
            payload: {
              startDate: moment()
                .startOf("week")
                .subtract(1, "weeks")
                .startOf("day"),
              endDate: moment()
                .startOf("week")
                .startOf("day")
            }
          });
        }}
      >
        last week
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          dispatch({
            type: "setState",
            payload: {
              startDate: moment()
                .startOf("month")
                .subtract(1, "months")
                .startOf("day"),
              endDate: moment()
                .startOf("month")
                .startOf("day")
            }
          });
        }}
      >
        last month
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          dispatch({
            type: "setState",
            payload: {
              startDate: moment()
                .startOf("month")
                .startOf("day"),
              endDate: moment().endOf("day")
            }
          });
        }}
      >
        this month
      </button>
    </div>
  );
};
