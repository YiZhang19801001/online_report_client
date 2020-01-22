import {
  dateStart,
  dateEnd,
  showModal,
  showUserCenter,
  showCancelNotification,
  source // axios source use to cancel http request
} from "../app/shared/reducers";
import { userResetPassword } from "../app/auth/reducers";
import dateForDailyReport from "../app/summary/reducers";
import { monthForWeeklyReport } from "../app/weekly/reducers";
import { combineReducers } from "redux";

const refeshAxiosToken = (refeshAxiosToken = false, action) => {
  switch (action.type) {
    case "SET_RefeshAxiosToken":

      return action.payload;

    default:
      return refeshAxiosToken;
  }
}

export default combineReducers({
  dateEnd,
  dateStart,
  dateForDailyReport,
  showModal,
  monthForWeeklyReport,
  showUserCenter,
  userResetPassword,
  showCancelNotification,
  source,
  refeshAxiosToken,
});
