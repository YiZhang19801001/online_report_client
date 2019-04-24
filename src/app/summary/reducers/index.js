import moment from "moment";
export default (dateForDailyReport = moment().format("YYYY-MM-DD"), action) => {
  switch (action.type) {
    case "setDateForDailyReport":
      return action.payload;

    default:
      return dateForDailyReport;
  }
};
