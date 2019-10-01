import moment from "moment";

export default (
  endDate = moment
    .utc()
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
