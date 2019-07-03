import moment from "moment";

export default (
  dateEnd = moment
    .utc()
    .add("minutes", "Australia/Sydney")
    .format("YYYY-MM-DD"),
  action
) => {
  switch (action.type) {
    case "setDateEnd":
      return action.payload;

    default:
      return dateEnd;
  }
};
