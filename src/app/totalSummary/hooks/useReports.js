import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../shared/constants";

export default (date, dispatch, groupId, type, agentName) => {
  const { startDate, endDate } = date;
  const [data, setData] = useState([]);
  useEffect(() => {
    if ((type === 'group' && groupId !== '') || type === 'agent' || type === 'shop' || type === '') {
      dispatch({ type: "setState", payload: { isLoading: true } });
      axios
        .post(
          `${apiUrl}/reports?`,
          {
            startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
            endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
            groupId,
            reportType: type,
            agentName: agentName ? agentName : '',
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
          const user = JSON.parse(localStorage.getItem("aupos_online_report_user"));
          localStorage.setItem('aupos_online_report_user', JSON.stringify({ ...user, shops: res.data.shops }));
        });
    }
  }, [date, groupId, agentName]);

  return data;
};
