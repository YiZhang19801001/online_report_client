import React from "react";
import { Loading } from "../shared";

export default ({ sum, date, comparison }) => {
  const getPercentage = () => {
    const sign = sum >= comparison ? 1 : -1;

    return ((sum - comparison) * 100 / sum).toFixed(2);
  }
  return (
    <div className="block">
      <span className="title">transactions</span>
      <span className="value">{sum ? parseInt(sum) : <Loading />}</span>
      <span className="compare">
        <span className="date">{`${date} ${comparison}`}</span>
        <img src="/increase-arrow.svg" alt="" />
        <span className="percentage">{getPercentage()}%</span>
      </span>
    </div>
  );
};
