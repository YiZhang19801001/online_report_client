import { dateStart, dateEnd, showModal } from "../app/shared/reducers";
import dateForDailyReport from "../app/summary/reducers";
import { combineReducers } from "redux";

export default combineReducers({
  dateEnd,
  dateStart,
  dateForDailyReport,
  showModal
});
