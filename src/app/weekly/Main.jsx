import React, { useEffect, useState, useCallback } from "react";
import { useMappedState } from "redux-react-hook";
import QuickDatePicker from "./components/QuickDatePicker";
import moment from "moment";
import { weeklyReport } from "./hooks";
import ProductsTable from "./ProductsTable";
import { Sales, NoOfTrans } from "../summary";
import { Header } from "../shared";
export default () => {
  const mapState = useCallback(
    ({ monthForWeeklyReport }) => ({
      monthForWeeklyReport
    }),
    []
  );
  const { monthForWeeklyReport } = useMappedState(mapState);
  const { weeklyReports, shops, weeks, comparison } = weeklyReport(
    monthForWeeklyReport
  );

  const sales = weeklyReports.reduce((sum, report) => {
    return sum + parseFloat(report.sales);
  }, 0);
  const numberOfTransactions = weeklyReports.reduce((sum, report) => {
    return sum + parseInt(report.tx);
  }, 0);

  let preScrollPosition = 0;
  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    const dom = document.querySelector("#weekly-report-page");
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
  return (
    <>
      <Header show={showHeader} />
      <div className="component-weekly-report" id="weekly-report-page">
        <div className={`row ${showHeader ? "" : "hide"}`}>
          <QuickDatePicker />
        </div>
        <div className="row">
          <Sales
            sales={sales}
            comparison={comparison.sales}
            date={moment(comparison.date).format("MMM")}
          />
          <NoOfTrans
            sum={numberOfTransactions}
            comparison={comparison.tx}
            date={moment(comparison.date).format("MMM")}
          />
        </div>
        <div className="row">
          {/* <ProductsTable list={productReports} /> */}
        </div>
      </div>
    </>
  );
};
