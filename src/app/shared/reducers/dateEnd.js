import moment from "moment";

export default (dateEnd = moment().format("YYYY-MM-DD"), action) => {
  switch (action.type) {
    case "setDateEnd":
      return action.payload;

    default:
      return dateEnd;
  }
};
