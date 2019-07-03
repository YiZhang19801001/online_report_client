import moment from "moment";
export default (
  monthForWeeklyReport = moment
    .utc()
    .add("minutes", "Australia/Sydney")
    .format("YYYY-MM-DD"),
  action
) => {
  switch (action.type) {
    case "setMonthForWeeklyReport":
      return action.payload;

    default:
      return monthForWeeklyReport;
  }
};
