import React from "react";
import { Loading } from "../shared";

export default ({ sum, date }) => {
  return (
    <div className="block">
      <span className="title">transactions</span>
      <span className="value">{sum ? parseInt(sum) : <Loading />}</span>
      <span className="compare">
        <span className="date">{`${date} 22`}</span>
        <img src="/increase-arrow.svg" alt="" />
        <span className="percentage">0.05%</span>
      </span>
    </div>
  );
};
