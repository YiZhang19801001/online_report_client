import React, { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import moment from "moment";

export default () => {
  const mapState = useCallback(
    ({ monthForWeeklyReport }) => ({
      monthForWeeklyReport
    }),
    []
  );
  const { monthForWeeklyReport } = useMappedState(mapState);
  const dispatch = useDispatch();
  const handleDateChange = e => {
    dispatch({
      type: "setMonthForWeeklyReport",
      payload: moment(e.target.value).format("YYYY-MM-DD")
    });
  };
  const handleMonthDecrease = () => {
    dispatch({
      type: "setMonthForWeeklyReport",
      payload: moment(monthForWeeklyReport)
        .subtract(1, "months")
        .format("YYYY-MM-DD")
    });
  };
  const handleMonthIncrease = () => {
    dispatch({
      type: "setMonthForWeeklyReport",
      payload: moment(monthForWeeklyReport)
        .add(1, "months")
        .format("YYYY-MM-DD")
    });
  };
  return (
    <div className="block large date-picker-container">
      <button className="date-tag decrease" onClick={handleMonthDecrease}>
        {moment(monthForWeeklyReport)
          .subtract(1, "months")
          .format("MMM")}
      </button>
      <div className="button-fade-cover decrease" />
      <span className="display-date">
        <span className="month">
          {moment(monthForWeeklyReport).format("MMM")}
        </span>
      </span>
      <button className="date-tag increase" onClick={handleMonthIncrease}>
        {moment(monthForWeeklyReport)
          .add(1, "months")
          .format("MMM")}
      </button>
      <input
        type="date"
        data-date={moment(monthForWeeklyReport).format("MMM")}
        value={monthForWeeklyReport}
        onChange={handleDateChange}
      />
    </div>
  );
};
