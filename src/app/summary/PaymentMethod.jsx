import React from "react";
import PayMethodTable from "./PayMethodTable";
import PayMethodChart from "./PayMethodChart";

export default ({ list }) => {
  return (
    <div className="payment-method">
      <p>payment method</p>
      <PayMethodChart list={list} />
      <PayMethodTable list={list} />
    </div>
  );
};
