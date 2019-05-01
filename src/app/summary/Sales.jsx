import React from "react";
import { Loading } from "../shared";

export default ({ sales, date, comparison }) => {
  const getPercentage = () => {
    const sign = sales >= comparison ? 1 : -1;

    return (((sales - comparison) * 100 * sign) / sales).toFixed(2);
  };

  const getSrc = () => {
    return sales >= comparison ? "/increase-arrow.svg" : "/decrease-arrow.svg";
  };
  const getClassName = () => {
    return sales >= comparison ? "percentage increase" : "percentage decrease";
  };
  return (
    <div className="block">
      <span className="title">total sales</span>
      <span className="value">
        {sales ? (
          <>
            <span className="symbol">$</span>
            <span>{`${parseFloat(sales).toFixed(2)}`}</span>
          </>
        ) : (
          <Loading />
        )}
      </span>
      <span className="compare">
        <span className="date">{`${date} $${parseFloat(comparison).toFixed(
          2
        )}`}</span>
        <img src={getSrc()} alt="" />
        <span className={getClassName()}>{getPercentage()}%</span>
      </span>
    </div>
  );
};
