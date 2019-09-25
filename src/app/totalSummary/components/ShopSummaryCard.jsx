import React from "react";
import { history } from "../../shared";
import userAuth from "../../shared/userAuth";

export default ({ report }) => {
  const {
    shop,
    totalSales,
    totalTx,
    gp,
    gp_percentage,
    totalRefund,
    discount,
    refundQty,
    gst
  } = report;
  const { shop_name, shop_id } = shop;
  const user_type = JSON.parse(localStorage.getItem("aupos_online_report_user")).user_type;
  const onClick = () => {
    userAuth().user_type === 'GIFTSHOPHEAD' ? history.push(`${process.env.PUBLIC_URL}/group/${shop_id}`)
      : history.push(`${process.env.PUBLIC_URL}/daily/${shop_id}`);
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
      {user_type === 'GIFTSHOPHEAD' ? <>
        <div className="row shop-report-data">
          <div className={`report`}>
            <div className={`title`}>Refund$:</div>
            <div className={`value`}>${parseFloat(discount).toFixed(2)}</div>
          </div>
          <div className={`report`}>
            <div className={`title`}>Refund Qty:</div>
            <div className={`value`}>
              {refundQty || 0}
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
              ${parseFloat(gst || 0).toFixed(2)}
            </div>
          </div>
        </div>
      </>
        :
        <div className="row shop-report-data">
          <div className={`report`}>
            <div className={`title`}>Discount:</div>
            <div className={`value`}>${parseFloat(discount).toFixed(2)}</div>
          </div>
          <div className={`report`}>
            <div className={`title`}>Refund:</div>
            <div className={`value`}>
              ${parseFloat(totalRefund * -1).toFixed(2)}
            </div>
          </div>
        </div>
      }
    </div>
  );
};
