import React, { useEffect, useState } from "react";
import { weeklyReport } from "./hooks";
import ProductsTable from "./ProductsTable";
import { Sales, NoOfTrans } from "../summary";
import { Header } from "../shared";
export default () => {
  const { sales, numberOfTransactions, productReports } = weeklyReport();

  let preScrollPosition = 0;
  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    const dom = document.querySelector("#weekly-report-page");
    console.log("ok");

    dom.addEventListener("scroll", () => {
      console.log("worked");

      if (preScrollPosition > dom.scrollTop) {
        console.log("up");
        setShowHeader(true);
      } else {
        console.log("down");
        setShowHeader(false);
      }
      preScrollPosition = dom.scrollTop;
    });

    return () => {
      console.log("weekly unmount");
    };
  }, []);
  return (
    <>
      <Header show={showHeader} />
      <div className="component-weekly-report" id="weekly-report-page">
        <div className="row">
          <Sales sales={sales} />
          <NoOfTrans sum={numberOfTransactions} />
        </div>
        <div className="row">
          <ProductsTable list={productReports} />
        </div>
      </div>
    </>
  );
};
