import { useEffect, useState } from "react";
import axios from "axios";
export default () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/weekly`).then(res => {
      setData(res.data);
    });
  }, []);

  return data;
};
