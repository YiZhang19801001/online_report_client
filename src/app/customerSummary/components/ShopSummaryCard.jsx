import React, { useEffect, useReducer, useContext } from "react";
import { history, Loading } from "../../shared";
import OfflineShop from "./OfflineShop"
import axios from "axios";
import { apiUrl } from "../../shared/constants";
import { CustomerReportSumaryCtx } from "./SummaryList"

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':

      return { ...state, ...action.payload };

    default:
      return state;
  }
}

const initState = {
  report: {
    totalSales: 0,
    totalTx: 0,
    gp: 0,
    gp_percentage: 0,
    totalRefund: 0,
    discount: 0,
    refundQty: 0,
    gst: 0,
  },
  isLoading: true
}


export default ({ shop, source }) => {

  const [state, dispatch] = useReducer(reducer, initState)
  const [parentState, parentDispatch] = useContext(CustomerReportSumaryCtx)

  const { report, isLoading } = state
  const { date } = parentState
  useEffect(() => {
    dispatch({
      type: 'SET',
      payload: { isLoading: true }
    })
    parentDispatch({
      type: 'PUSH_LOADING_SHOP',
      payload: shop
    })
    axios
      .get(`${apiUrl}/reports/${shop.shop_id}`, {
        cancelToken: source.token,
        params: {
          startDate: date.startDate.format("YYYY-MM-DD HH:mm:ss"),
          endDate: date.endDate.format("YYYY-MM-DD HH:mm:ss")
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("aupos_online_report_user"))
              .access_token
            }`
        }
      })
      .then(resp => {
        dispatch({
          type: 'SET',
          payload: { report: resp.data.report, isLoading: false }
        })
        parentDispatch({
          type: 'PUSH_REPORT',
          payload: resp.data.report
        })
        parentDispatch({
          type: 'REMOVE_LOADING_SHOP',
          payload: shop
        })
      }).catch(errs => {
        console.log(errs);
        dispatch({
          type: 'SET',
          payload: { isLoading: false }
        })
        parentDispatch({
          type: 'REMOVE_LOADING_SHOP',
          payload: shop
        })
      })
  }, [date])

  const {
    totalSales,
    totalTx,
    gp,
    gp_percentage,
    totalRefund,
    discount,
    refundQty,
    gst,
  } = report;

  const { shop_name, shop_id } = shop || { shop_name: "读取名字失败", shop_id: report.shop_id };

  const onClick = () => {
    history.push(`${process.env.PUBLIC_URL}/daily/${shop_id}`);
  };



  if (report.totalSales === null && report.toRefund === null) {
    return <OfflineShop shop={shop} />
  } else {
    return (
      <div className={`shop-summary-card`}>
        <div className={"row shop-name"} onClick={onClick}>
          {shop_name}
        </div>

        {isLoading ? <Loading /> : (
          <>
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
          </>
        )}

      </div>
    );
  }

};
