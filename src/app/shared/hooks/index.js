import { useEffect } from "react";
import { history } from "../history";
import axios from "axios";
import { apiUrl } from "../constants";

export const checkLogin = originUrl => {
  const user = JSON.parse(localStorage.getItem("aupos_online_report_user"));
  console.log("check login hooks called");

  if (!user) {
    history.push(`${process.env.PUBLIC_URL}/login`);
    return false;
  }
  useEffect(() => {
    axios
      .get(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`
        }
      })
      .then(res => {
        if (originUrl === `${process.env.PUBLIC_URL}/`) {
          history.push(`${process.env.PUBLIC_URL}/daily`);
        } else {
          history.push(`${originUrl}`);
        }
      })
      .catch(err => {
        localStorage.removeItem("aupos_online_report_user");
        history.push(`${process.env.PUBLIC_URL}/login`);
      });
  }, [user.access_token]);
};
