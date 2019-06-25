import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../shared/constants";

export default (date, shopId) => {
  const [data, setData] = useState({
    weeklyReports: [],
    comparison: { month: "Jan", sales: 0, tx: 0 }
  });
  useEffect(() => {
    axios
      .get(
        `${apiUrl}/reports?meta=weeklySummary&date=${date}${
          shopId ? `&shopId=${shopId}` : ""
        }`,
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
      });
  }, [date, shopId]);

  return data;
};
