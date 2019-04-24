import React from "react";
import { Table } from "../shared/";
import { Loading } from "../shared";

export default ({ list }) => {
  return (
    <div className="block large">
      <span className="title">Sales by Payment Method</span>
      {list ? (
        <Table ths={ths} dataFormat={dataFormat} data={list} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

const ths = [
  { value: "payment type", type: "text" },
  { value: "amount", type: "number" },
  { value: "amount %", type: "number" }
];
const dataFormat = [
  { value: "paymenttype", type: "text" },
  { value: "total", type: "number" },
  { value: "percentage", type: "number" }
];
