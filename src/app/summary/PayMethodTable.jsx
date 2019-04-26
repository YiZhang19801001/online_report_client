import React from "react";
import { Table } from "../shared/";
import { Loading } from "../shared";

export default ({ list }) => {
  return (
    <div className="block large payment-method">
      {list ? (
        <Table
          ths={ths}
          dataFormat={dataFormat}
          data={list}
          sum={false}
          striped={false}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};

const ths = [
  { value: "type", type: "text" },
  { value: "amount", type: "number" }
  // { value: "amount %", type: "number" }
];
const dataFormat = [
  { value: "paymenttype", type: "text" },
  { value: "total", type: "number" }
  // { value: "percentage", type: "number" }
];
