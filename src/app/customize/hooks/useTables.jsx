import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../shared/constants";

export default (status_id, dispatch, shopId) => {
  const [data, setData] = useState({
    tables: [],
    tableStats: {
      all: 0,
      available: 0,
      occupied: 0,
      reserve: 0
    }
  });
  useEffect(() => {
    dispatch({ type: "setState", payload: { isLoading: true } });

    let path = "";

    if (shopId && status_id !== null) {
      path = `?shopId=${shopId}&table_status=${status_id}`;
    } else if (shopId) {
      path = `?shopId=${shopId}`;
    } else if (status_id !== null) {
      path = `?table_status=${status_id}`;
    }

    axios
      .get(`${apiUrl}/tables${path}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("aupos_online_report_user"))
              .access_token
          }`
        }
      })
      .then(res => {
        setData(res.data);
        dispatch({ type: "setState", payload: { isLoading: false } });
      });
  }, [status_id, shopId]);

  return data;
};
