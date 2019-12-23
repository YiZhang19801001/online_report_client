import React from "react";
import { Loading } from "../shared";

export default ({ sum, date, comparison }) => {
  const getPercentage = () => {
    const sign = sum >= comparison ? 1 : -1;
    if (sum === 0) return 0
    return (((sum - comparison) * 100 * sign) / sum).toFixed(2);
  };
  const getSrc = () => {
    return sum >= comparison
      ? "http://kidsnparty.com.au/report/increase-arrow.svg"
      : "http://kidsnparty.com.au/report/decrease-arrow.svg";
  };
  const getClassName = () => {
    return sum >= comparison ? "percentage increase" : "percentage decrease";
  };
  return (
    <div className="block">
      <span className="title">transactions</span>
      <span className="value">{sum || sum === 0 ? parseInt(sum) : <Loading />}</span>
      <span className="compare">
        <span className="date">{`${date} ${comparison}`}</span>
        <img src={getSrc()} alt="" />
        <span className={getClassName()}>{getPercentage()}%</span>
      </span>
    </div>
  );
};
