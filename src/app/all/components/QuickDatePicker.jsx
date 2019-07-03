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
              startDate: moment
                .utc()
                .subtract(7, "days")
                .startOf("day")
                .add("minutes", "Australia/Sydney"),
              endDate: moment
                .utc()
                .endOf("day")
                .add("minutes", "Australia/Sydney")
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
              startDate: moment
                .utc()
                .add("minutes", "Australia/Sydney")
                .startOf("week")
                .subtract(1, "weeks")
                .startOf("day"),
              endDate: moment
                .utc()
                .add("minutes", "Australia/Sydney")
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
              startDate: moment
                .utc()
                .add("minutes", "Australia/Sydney")
                .startOf("month")
                .subtract(1, "months")
                .startOf("day"),
              endDate: moment
                .utc()
                .add("minutes", "Australia/Sydney")
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
              startDate: moment
                .utc()
                .add("minutes", "Australia/Sydney")
                .startOf("month")
                .startOf("day"),
              endDate: moment
                .utc()
                .add("minutes", "Australia/Sydney")
                .endOf("day")
            }
          });
        }}
      >
        this month
      </button>
    </div>
  );
};
