import { useEffect, useState } from "react";
import axios from "axios";

import { apiUrl } from "../../shared/constants";

export default (startDate, endDate, reportType, shopId, dispatch) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    dispatch({ type: "setState", payload: { isLoading: true } });

    axios
      .put(
        `${apiUrl}/reports/${shopId}`,
        {
          startDate,
          endDate,
          reportType,
          shopId
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
        setReports(res.data.reports);
        dispatch({ type: "setState", payload: { isLoading: false } });
      });
  }, [startDate, endDate, reportType, shopId]);

  return reports;
};
