import React from "react";

import { Table, Loading } from "../shared";

export default ({ list }) => {
  return (
    <div className="block large">
      <span className="title">products reports</span>
      {list ? (
        <Table ths={ths} dataFormat={dataFormat} data={list} sum={true} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

const ths = [
  { value: "product name", type: "text" },
  { value: "quantity", type: "number" },
  { value: "amount", type: "number" }
];
const dataFormat = [
  { value: "name", type: "text" },
  { value: "quantity", type: "number" },
  { value: "amount", type: "number" }
];
