import React from "react";
import { history } from "../../shared";

export default ({ report }) => {
  const { shop, totalSales, totalTx } = report;
  const { shop_name, shop_id } = shop;
  const onClick = () => {
    history.push(`${process.env.PUBLIC_URL}/daily/${shop_id}`);
  };
  return (
    <div className={`shop-summary-card`}>
      <div className="row shop-name" onClick={onClick}>
        {shop_name}
      </div>
      <div className="row shop-report-data">
        <div className={`report`}>
          <div className={`title`}>sales:</div>
          <div className={`value`}>${parseFloat(totalSales).toFixed(2)}</div>
        </div>
        <div className={`report`}>
          <div className={`title`}>transactions:</div>
          <div className={`value`}>{totalTx}</div>
        </div>
      </div>
    </div>
  );
};
