import React from "react";
import { Table, Loading } from "../shared";
export default ({ list }) => {
  return (
    <div className="block large">
      {list ? (
        <Table ths={ths} dataFormat={dataFormat} data={list} sum={true} />
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
