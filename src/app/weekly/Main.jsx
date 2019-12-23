import React, { useEffect, useState, useCallback } from "react";
import { useMappedState } from "redux-react-hook";
import { QuickDatePicker, TabGroup, WeeklyReportsTable } from "./components/";
import moment from "moment";
import { weeklyReport } from "./hooks";
import { Sales, NoOfTrans } from "../summary";
import { Header } from "../shared";

let preScrollPosition = 0;


export default props => {
  const { shopId } = props.match.params;
  const mapState = useCallback(
    ({ monthForWeeklyReport }) => ({
      monthForWeeklyReport
    }),
    []
  );
  const { monthForWeeklyReport } = useMappedState(mapState);
  const { weeklyReports, shops, weeks, comparison } = weeklyReport(
    monthForWeeklyReport,
    shopId
  );

  const sales = weeklyReports.reduce((sum, report) => {
    return sum + parseFloat(report.sales);
  }, 0);
  const numberOfTransactions = weeklyReports.reduce((sum, report) => {
    return sum + parseInt(report.tx);
  }, 0);

  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    const dom = document.querySelector("#weekly-report-page");
    const handleScroll = () => {
      if (preScrollPosition > dom.scrollTop && dom.scrollTop / preScrollPosition < 0.7) {
        setShowHeader(true);
      } else if (preScrollPosition < dom.scrollTop && dom.scrollTop / preScrollPosition > 1.5) {
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
      <Header show={showHeader} shops={shops} {...props} />
      <div className="component-weekly-report" id="weekly-report-page">
        <div style={{ height: 'max-content', paddingBottom: '15rem' }}>
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
          <div className="row weekly-reports">
            <TabGroup tabs={getTabs(weeklyReports)} />
            <WeeklyReportsTable
              data={weeklyReports}
              tabs={getTabs(weeklyReports)}
              weeks={weeks}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const getTabs = reports => {
  let tabs = ["Cash"];

  reports.forEach(report => {
    const { paymentMethodReports } = report;

    paymentMethodReports.forEach(item => {
      if (!tabs.includes(item.paymenttype) && item.paymenttype.toLowerCase() !== "cash") {
        tabs = [...tabs, item.paymenttype];
      }
    });
  });

  return tabs;
};
