import React, { useEffect, useState } from "react";
import { Table, Loading } from "../shared";
import { apiUrl } from "../shared/constants";
import axios from "axios";
import moment from "moment";

export default ({ date }) => {
  const [dataGroup, setDataGroup] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("aupos_online_report_user"))
      .access_token;

    const paramsDate = moment(date).format(`YYYYMMDD`);
    axios
      .get(`${apiUrl}/reports?date=${paramsDate}&meta=dataGroup`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setDataGroup(res.data.reports.dataGroup);
      });
  }, [date]);

  const getTotal = () => {
    if (!dataGroup) {
      return 0;
    }
    return dataGroup.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  };

  return (
    <div className="block large data-group">
      <p>
        <span className="title">Total Cups</span>
        <span className="total">{getTotal()}</span>
      </p>
      {dataGroup ? (
        <Table
          ths={ths}
          dataFormat={dataFormat}
          data={dataGroup}
          sum={false}
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
