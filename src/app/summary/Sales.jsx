import React from "react";
import { Loading } from "../shared";

export default ({ sales, date, comparison }) => {
  const getPercentage = () => {
    const sign = sales >= comparison ? 1 : -1;
    if (sales === 0) return 0
    return (((sales - comparison) * 100 * sign) / sales).toFixed(2);
  };

  const getSrc = () => {
    return sales >= comparison
      ? "http://kidsnparty.com.au/report/increase-arrow.svg"
      : "http://kidsnparty.com.au/report/decrease-arrow.svg";
  };
  const getClassName = () => {
    return sales >= comparison ? "percentage increase" : "percentage decrease";
  };
  return (
    <div className="block">
      <span className="title">total sales</span>
      <span className="value"
        style={{ lineHeight: '1.5rem' }}
      >
        {sales || sales === 0 ? (
          <>
            <span className="symbol">$</span>
            <span
              style={parseFloat(sales).toFixed(2).length > 5 ? { fontSize: '1rem' } : {}}
            >{`${parseFloat(sales).toFixed(2)}`}</span>
          </>
        ) : (
            <Loading />
          )}
      </span>
      <span className="compare"

      >
        <span className="date"
        >{`${date} $${comparison > 9999 ? `${parseFloat(comparison / 1000).toFixed(2)}K` : parseFloat(comparison).toFixed(2)}`}
        </span>
        <img src={getSrc()} alt="" />
        <span className={getClassName()}>{getPercentage()}%</span>
      </span>
    </div>
  );
};
