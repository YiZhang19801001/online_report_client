import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../shared/constants";

export default (status_id, dispatch, shopId, site_id = "all") => {
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

    if (shopId && status_id !== null && site_id !== "all") {
      path = `?shopId=${shopId}&table_status=${status_id}&site_id=${site_id}`;
    } else if (shopId && site_id === "all") {
      path = `?shopId=${shopId}`;
    } else if (status_id !== null && site_id === "all") {
      path = `?table_status=${status_id}`;
    } else if (site_id !== "all" && shopId) {
      path = `?shopId=${shopId}&site_id=${site_id}`;
    } else if (site_id !== "all" && status_id !== null) {
      path = `?table_status=${status_id}&site_id=${site_id}`;
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
  }, [status_id, shopId, site_id]);

  return data;
};
