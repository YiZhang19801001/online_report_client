import React, { useEffect, useState, useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import momment from "moment";
import axios from "axios";
import Sales from "./Sales";
import NoOfTrans from "./NoOfTrans";
import PaymentMethod from "./PaymentMethod";
import DataGroup from "./DataGroup";
import { QuickDatePicker } from "./components/";
import { Header } from "../shared";
import { apiUrl } from "../shared/constants";

export default props => {
  const { shopId } = props.match.params;
  const [reports, setReports] = useState({});
  const [rendered, setRendered] = useState(false);
  const mapState = useCallback(
    ({ dateForDailyReport, showModal }) => ({
      dateForDailyReport,
      showModal
    }),
    []
  );
  const { dateForDailyReport, showModal } = useMappedState(mapState);
  const dispatch = useDispatch();
  useEffect(() => {
    const date = momment(dateForDailyReport).format(`YYYYMMDD`);
    const fn = async () => {
      const response = await axios.get(
        `${apiUrl}/reports?date=${date}${shopId ? `&shopId=${shopId}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("aupos_online_report_user"))
                .access_token
            }`
          }
        }
      );

      setReports(response.data.reports);
      setRendered(true);
      dispatch({ type: "closeModal" });
    };
    fn();
  }, [dateForDailyReport, shopId]);

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
      <Header show={showHeader} shops={reports.shops} {...props} />

      <div
        className={`summary ${showHeader ? "" : "header-hide"} ${
          showModal ? "blur" : ""
        }`}
        id="summary-page"
      >
        <div className={`row ${showHeader ? "" : "hide"}`}>
          <QuickDatePicker />
        </div>
        <div className="row">
          <Sales
            sales={reports.sales}
            comparison={reports.compareSales}
            date={momment(dateForDailyReport).format(`MMM DD`)}
          />
          <NoOfTrans
            sum={reports.numberOfTransactions}
            comparison={reports.compareNumberOfTransactions}
            date={momment(dateForDailyReport).format(`MMM DD`)}
          />
        </div>
        <div className="row shadow">
          <PaymentMethod list={formatedPaymentReports} />
        </div>

        <div className="row shadow">
          {rendered && <DataGroup date={dateForDailyReport} />}
        </div>
      </div>
    </>
  );
};
