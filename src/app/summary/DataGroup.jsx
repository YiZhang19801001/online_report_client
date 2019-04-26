import React, { useEffect, useState } from "react";
import { Table, Loading } from "../shared";
import axios from "axios";
import moment from "moment";

export default ({ date }) => {
  const [dataGroup, setDataGroup] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("aupos_online_report_user"))
      .access_token;

    const paramsDate = moment(date).format(`YYYYMMDD`);
    axios
      .get(
        `http://localhost:8000/api/reports?date=${paramsDate}&meta=dataGroup`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        setDataGroup(res.data.reports.dataGroup);
      });
  }, [date]);

  return (
    <div className="block large">
      {dataGroup ? (
        <Table
          ths={ths}
          dataFormat={dataFormat}
          data={dataGroup}
          sum={true}
          striped={true}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

const ths = [
  { value: "size level", type: "text" },
  { value: "quantity", type: "number" }
];
const dataFormat = [
  { value: "size", type: "text" },
  { value: "quantity", type: "number" }
];
