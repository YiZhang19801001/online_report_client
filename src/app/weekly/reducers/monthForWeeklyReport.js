import moment from "moment";
export default (
  monthForWeeklyReport = moment().format("YYYY-MM-DD"),
  action
) => {
  switch (action.type) {
    case "setMonthForWeeklyReport":
      return action.payload;

    default:
      return monthForWeeklyReport;
  }
};
