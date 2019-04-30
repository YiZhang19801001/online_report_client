import { useEffect } from "react";
import { history } from "../history";
import axios from "axios";
export const checkLogin = originUrl => {
  const user = JSON.parse(localStorage.getItem("aupos_online_report_user"));
  console.log("check login hooks called");

  if (!user) {
    history.push(`${process.env.PUBLIC_URL}/login`);
    return false;
  }
  useEffect(() => {
    axios
      .get(`http://192.168.1.5/online_report/public/api/user`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      })
      .then(res => {
        history.push(`${process.env.PUBLIC_URL}${originUrl}`);
      })
      .catch(err => {
        localStorage.removeItem("aupos_online_report_user");
        history.push(`${process.env.PUBLIC_URL}/login`);
      });
  }, [user.access_token]);
};
