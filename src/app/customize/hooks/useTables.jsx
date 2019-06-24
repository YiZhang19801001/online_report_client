import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../shared/constants";

export default (status_id, dispatch) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch({ type: "setState", payload: { isLoading: true } });
    const path =
      status_id === null ? "tables" : `tables?table_status=${status_id}`;
    axios
      .get(`${apiUrl}/${path}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("aupos_online_report_user"))
              .access_token
          }`
        }
      })
      .then(res => {
        setData(res.data.tables);
        dispatch({ type: "setState", payload: { isLoading: false } });
      });
  }, [status_id]);

  return data;
};
