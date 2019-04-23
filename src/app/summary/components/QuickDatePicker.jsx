import React from "react";
import moment from "moment";
export default () => {
  return (
    <div className="block large date-picker-container">
      <button
        className="date-tag"
        data-value={`yesterday`}
        onClick={handleDateChange}
      >
        Yesterday
      </button>
      <button
        className="date-tag"
        data-value={`-2 day`}
        onClick={handleDateChange}
      >
        Day Before Yesterday
      </button>
      <button
        className="date-tag"
        data-value={`last week`}
        onClick={handleDateChange}
      >
        Same day last week
      </button>
      <button
        className="date-tag"
        data-value={`last month`}
        onClick={handleDateChange}
      >
        Same day last month
      </button>
    </div>
  );
};

const handleDateChange = e => {
  let msg = "will render report for ";

  switch (e.target.dataset.value) {
    case "yesterday":
      msg += moment()
        .subtract(1, "days")
        .toLocaleString();
      break;
    case "-2 day":
      msg += moment()
        .subtract(2, "days")
        .toLocaleString();
      break;
    case "last week":
      msg += moment()
        .subtract(7, "days")
        .toLocaleString();
      break;
    case "last month":
      msg += moment()
        .subtract(1, "months")
        .toLocaleString();
      break;
    default:
      break;
  }

  setTimeout(alert(msg), 3000);
};
