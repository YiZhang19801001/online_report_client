import React from "react";
import { weeklyReport } from "./hooks";
import ProductsTable from "./ProductsTable";
import { Sales, NoOfTrans } from "../summary";
import { Header } from "../shared";
export default () => {
  const { sales, numberOfTransactions, productReports } = weeklyReport();

  return (
    <>
      <Header />
      <div className="component-weekly-report">
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
