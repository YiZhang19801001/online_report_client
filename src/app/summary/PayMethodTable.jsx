import React from "react";
import { Table } from "../shared/";
import { Loading } from "../shared";

export default ({ list }) => {
  console.log({ list });
  return (
    <div className="block">
      <span className="title">Sales by Payment Method</span>
      {list ? (
        <Table
          ths={["payment type", "amout", "amout %"]}
          dataFormat={["paymenttype", "total", "percentage"]}
          data={list}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
};
