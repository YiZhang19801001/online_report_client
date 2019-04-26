import React from "react";
import { Loading } from "../shared";

export default ({ sales, date }) => {
  return (
    <div className="block">
      <span className="title">total sales</span>
      <span className="value">
        {sales ? `$${parseFloat(sales).toFixed(2)}` : <Loading />}
      </span>
      <span className="compare">
        <span className="date">{`${date} $623,000`}</span>
        <img src="/increase-arrow.svg" alt="" />
        <span className="percentage">0.05%</span>
      </span>
    </div>
  );
};
