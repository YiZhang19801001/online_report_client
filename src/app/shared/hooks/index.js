import { useEffect } from "react";
import { history } from "../history";
export const checkLogin = () => {
  const user = JSON.parse(localStorage.getItem("aupos_online_report_user"));
  if (!user) {
    history.push(`${process.env.PUBLIC_URL}/login`);
  }
  useEffect();
};
