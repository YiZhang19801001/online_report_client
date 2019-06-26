import React from "react";
import moment from "moment";

export default ({ startDate, endDate, dispatch }) => {
  return (
    <div className="flat-block">
      <span className="title">select period</span>
      <div className="container">
        <input
          type="date"
          value={startDate.format("YYYY-MM-DD")}
          onChange={e => {
            dispatch({
              type: "setState",
              payload: { startDate: moment(e.target.value) }
            });
          }}
        />
        <input
          type="date"
          value={endDate.format("YYYY-MM-DD")}
          onChange={e =>
            dispatch({
              type: "setState",
              payload: { endDate: moment(e.target.value) }
            })
          }
        />
      </div>
    </div>
  );
};
