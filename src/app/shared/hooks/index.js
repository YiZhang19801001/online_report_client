import { useEffect } from "react";
import { history } from "../history";
import axios from "axios";
export const checkLogin = () => {
  const user = JSON.parse(localStorage.getItem("aupos_online_report_user"));
  console.log("hooks called");

  if (!user) {
    history.push(`${process.env.PUBLIC_URL}/login`);
    return false;
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/auth/user`, {
        Authorization: `Bearer ${user.access_token}`
      })
      .then(res => {
        history.push(`${process.env.PUBLIC_URL}/daily`);
      })
      .catch(err => {
        localStorage.removeItem("aupos_online_report_user");
        history.push(`${process.env.PUBLIC_URL}/login`);
      });
  }, [user.access_token]);
};
