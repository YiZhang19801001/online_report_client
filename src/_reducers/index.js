import {
  dateStart,
  dateEnd,
  showModal,
  showUserCenter
} from "../app/shared/reducers";
import { userResetPassword } from "../app/auth/reducers";
import dateForDailyReport from "../app/summary/reducers";
import { monthForWeeklyReport } from "../app/weekly/reducers";
import { combineReducers } from "redux";

export default combineReducers({
  dateEnd,
  dateStart,
  dateForDailyReport,
  showModal,
  monthForWeeklyReport,
  showUserCenter,
  userResetPassword
});
