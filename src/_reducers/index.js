import { dateStart, dateEnd } from "../app/shared/reducers";
import { combineReducers } from "redux";

export default combineReducers({
  dateEnd,
  dateStart
});
