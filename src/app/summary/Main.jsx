import React, { useEffect, useState } from "react";
import axios from "axios";
import Sales from "./Sales";
import NoOfTrans from "./NoOfTrans";
import PayMethodTable from "./PayMethodTable";
import PayMethodChart from "./PayMethodChart";
import DataGroup from "./DataGroup";
import QuickDatePicker from "./components/QuickDatePicker";
import { Header } from "../shared";
export default () => {
  const [reports, setReports] = useState({});

  useEffect(() => {
    const fn = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/reports?date=20190410230000"
      );
      setReports(response.data.reports);
    };
    fn();
  }, []);

  let preScrollPosition = 0;
  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    const dom = document.querySelector("#summary-page");
    const handleScroll = () => {
      if (preScrollPosition > dom.scrollTop) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      preScrollPosition = dom.scrollTop;
    };
    dom.addEventListener("scroll", handleScroll);

    return () => {
      dom.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // todo: need fixed
  let formatedPaymentReports = [];
  if (reports.reportsForPaymentMethod) {
    formatedPaymentReports = reports.reportsForPaymentMethod.map(row => {
      return {
        ...row,
        total: parseFloat(row.total).toFixed(2),
        percentage: Math.round(row.percentage * 10000) / 100
      };
    });
  }
  return (
    <>
      <Header show={showHeader} />
      <div
        className={`summary ${showHeader ? "" : "header-hide"}`}
        id="summary-page"
      >
        <div className={`row ${showHeader ? "" : "hide"}`}>
          <QuickDatePicker />
        </div>
        <div className="row">
          <Sales sales={reports.sales} />
          <NoOfTrans sum={reports.numberOfTransactions} />
        </div>
        <div className="row">
          <PayMethodTable list={formatedPaymentReports} />
        </div>
        <div className="row">
          <PayMethodChart list={formatedPaymentReports} />
        </div>
        <div className="row">
          <DataGroup list={reports.dataGroup} />
        </div>
      </div>
    </>
  );
};
