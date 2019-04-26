import React, { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import moment from "moment";

export default () => {
  const mapState = useCallback(
    ({ dateForDailyReport }) => ({
      dateForDailyReport
    }),
    []
  );
  const { dateForDailyReport } = useMappedState(mapState);
  const dispatch = useDispatch();
  const handleDateChange = e => {
    dispatch({
      type: "setDateForDailyReport",
      payload: moment(e.target.value).format("YYYY-MM-DD")
    });
  };
  const handleDayDecrease = () => {
    dispatch({
      type: "setDateForDailyReport",
      payload: moment(dateForDailyReport)
        .subtract(1, "days")
        .format("YYYY-MM-DD")
    });
  };
  const handleDayIncrease = () => {
    dispatch({
      type: "setDateForDailyReport",
      payload: moment(dateForDailyReport)
        .add(1, "days")
        .format("YYYY-MM-DD")
    });
  };
  return (
    <div className="block large date-picker-container">
      <button
        className="date-tag decrease"
        data-value={`yesterday`}
        onClick={handleDayDecrease}
      >
        {moment(dateForDailyReport)
          .subtract(1, "days")
          .format("MMM DD")}
      </button>
      <span className="display-date">
        <span className="month">
          {moment(dateForDailyReport).format("MMM")}
        </span>
        <span className="day">{moment(dateForDailyReport).format("DD")}</span>
      </span>
      <button
        className="date-tag increase"
        data-value={`-2 day`}
        onClick={handleDayIncrease}
      >
        {moment(dateForDailyReport)
          .add(1, "days")
          .format("MMM DD")}
      </button>
      <input
        type="date"
        data-date={moment(dateForDailyReport).format("MMM Do")}
        value={dateForDailyReport}
        onChange={handleDateChange}
      />
    </div>
  );
};
