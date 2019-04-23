import moment from "moment";
export default (
  dateStart = moment()
    .subtract(1, "days")
    .format("YYYY-MM-DD"),
  action
) => {
  switch (action.type) {
    case "setDateStart":
      return action.payload;

    default:
      return dateStart;
  }
};
