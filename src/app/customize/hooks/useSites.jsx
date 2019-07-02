import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../shared/constants";

export default (dispatch, shopId) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch({ type: "setState", payload: { isLoading: true } });

    let path = "";

    if (shopId) {
      path = `?shopId=${shopId}`;
    }

    axios
      .get(`${apiUrl}/sites${path}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("aupos_online_report_user"))
              .access_token
          }`
        }
      })
      .then(res => {
        setData(res.data.sites);
        dispatch({ type: "setState", payload: { isLoading: false } });
      });
  }, [shopId]);

  return data;
};
