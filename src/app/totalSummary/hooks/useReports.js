import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../shared/constants";

export default (date, dispatch) => {
  const { startDate, endDate } = date;
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch({ type: "setState", payload: { isLoading: true } });

    axios
      .post(
        `${apiUrl}/reports?`,
        {
          startDate,
          endDate
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("aupos_online_report_user"))
                .access_token
            }`
          }
        }
      )
      .then(res => {
        setData(res.data.reports);
        dispatch({ type: "setState", payload: { isLoading: false } });
      });
  }, [date]);

  return data;
};
