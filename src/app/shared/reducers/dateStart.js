import moment from "moment";
export default (
  startDate = moment
    .utc()
    .add("minutes", "Australia/Sydney")
    .subtract(0, "days"),
  action
) => {
  switch (action.type) {
    case "setDateStart":
      return action.payload;

    default:
      return startDate;
  }
};
