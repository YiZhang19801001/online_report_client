import React from "react";
import { Loading } from "../shared";

export default ({ sales, date, comparison }) => {
  const getPercentage = () => {
    const sign = sales >= comparison ? 1 : -1;

    return ((sales - comparison) * 100 / sales).toFixed(2);
  }
  return (
    <div className="block">
      <span className="title">total sales</span>
      <span className="value">
        {sales ? `$${parseFloat(sales).toFixed(2)}` : <Loading />}
      </span>
      <span className="compare">
        <span className="date">{`${date} $${parseFloat(comparison).toFixed(2)}`}</span>
        <img src="/increase-arrow.svg" alt="" />
        <span className="percentage">{getPercentage()}%</span>
      </span>
    </div>
  );
};
