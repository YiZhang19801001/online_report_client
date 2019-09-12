import React from "react";
import { history } from "../../shared";

export default ({ report }) => {
  const {
    shop,
    totalSales,
    totalTx,
    gp,
    gp_percentage,
    totalRefund,
    discount
  } = report;
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
          <div className={`title`}>Sales:</div>
          <div className={`value`}>${parseFloat(totalSales || 0).toFixed(2)}</div>
        </div>
        <div className={`report`}>
          <div className={`title`}>Sales Qty:</div>
          <div className={`value`}>{totalTx}</div>
        </div>
      </div>
      <div className="row shop-report-data">
        <div className={`report`}>
          <div className={`title`}>GP$:</div>
          <div className={`value`}>${parseFloat(gp).toFixed(2)}</div>
        </div>
        <div className={`report`}>
          <div className={`title`}>GP%:</div>
          <div className={`value`}>{`${Math.round(
            parseFloat(gp_percentage) * 10000
          ) / 100}%`}</div>
        </div>
      </div>
      <div className="row shop-report-data">
        <div className={`report`}>
          <div className={`title`}>Refund$:</div>
          <div className={`value`}>${parseFloat(discount).toFixed(2)}</div>
        </div>
        <div className={`report`}>
          <div className={`title`}>Refund Qty:</div>
          <div className={`value`}>
            ${parseFloat(totalRefund * -1).toFixed(2)}
          </div>
        </div>
      </div>
      <div className="row shop-report-data">
        <div className={`report`}>
          <div className={`title`}>Discount:</div>
          <div className={`value`}>${parseFloat(discount).toFixed(2)}</div>
        </div>
        <div className={`report`}>
          <div className={`title`}>GST:</div>
          <div className={`value`}>
            ${parseFloat(totalRefund * -1).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
