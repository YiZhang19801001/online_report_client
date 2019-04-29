import { useEffect, useState } from "react";
import axios from "axios";
export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://192.168.1.5/online_report/public/api/weekly`)
      .then(res => {
        setData(res.data);
      });
  }, []);

  return data;
};
