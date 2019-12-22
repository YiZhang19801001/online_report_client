import moment from "moment";
export default (
  startDate = moment.utc()
    .add("minutes", "Australia/Sydney")
    .startOf("day"),
  action
) => {
  switch (action.type) {
    case "setDateStart":
      return action.payload;

    default:
      return startDate;
  }
};
