import { useEffect } from "react";
import { history } from "../history";
import axios from "axios";
import { apiUrl } from "../constants";

export const checkLogin = originUrl => {
  const user = JSON.parse(localStorage.getItem("aupos_online_report_user"));
  useEffect(() => {
    if (!user) {
      history.push(`${process.env.PUBLIC_URL}/login`);
    } else {
      axios
        .get(`${apiUrl}/user`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`
          }
        })
        .then(res => {
          if (res.data.id && originUrl === `${process.env.PUBLIC_URL}/`) {
            const lastVisitPage = localStorage.getItem('aupos_online_report_last_visit_page')
            if (lastVisitPage) {
              history.push(`${process.env.PUBLIC_URL}${lastVisitPage}`)
            } else if (res.data.user_type === "CUSTOMER") {
              // home page for user who has only 1 store
              history.push(`${process.env.PUBLIC_URL}/daily`)
            } else {
              history.push(`${process.env.PUBLIC_URL}/total`)
            }
          } else {
            history.push(`${originUrl}`);
          }
        })
        .catch(err => {
          localStorage.removeItem("aupos_online_report_user");
          history.push(`${process.env.PUBLIC_URL}/login`);
        });
    }
  }, [originUrl]);
};
