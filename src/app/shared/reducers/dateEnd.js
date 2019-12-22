import moment from "moment";

export default (
  endDate = moment
    .utc()
    .endOf("day")
    .add("minutes", "Australia/Sydney"),
  action
) => {
  switch (action.type) {
    case "setDateEnd":
      return action.payload;

    default:
      return endDate;
  }
};
