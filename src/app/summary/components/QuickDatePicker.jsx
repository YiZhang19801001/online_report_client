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
        <i className="material-icons">arrow_left</i>
      </button>
      <input
        type="date"
        value={dateForDailyReport}
        onChange={handleDateChange}
      />
      <button
        className="date-tag increase"
        data-value={`-2 day`}
        onClick={handleDayIncrease}
      >
        <i className="material-icons">arrow_right</i>
      </button>
    </div>
  );
};
