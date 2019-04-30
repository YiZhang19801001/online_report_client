import { useEffect, useState } from "react";
import axios from "axios";
export default date => {
  const [data, setData] = useState({
    weeklyReports: [],
    comparison: { month: "Jan", sales: 0, tx: 0 }
  });
  useEffect(() => {
    axios
      .get(
        `http://192.168.1.5/online_report/public/api/reports?meta=weeklySummary&date=${date}`,
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
  }, [date]);

  return data;
};
