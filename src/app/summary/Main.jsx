import React, { useEffect, useState } from "react";
import axios from "axios";
import Sales from "./Sales";
import NoOfTrans from "./NoOfTrans";
import PayMethodTable from "./PayMethodTable";
export default () => {
  const [reports, setReports] = useState({});

  useEffect(() => {
    const fn = async () => {
      const response = await axios.get(
        "http://localhost:8000/reports?date=20190410230000"
      );
      setReports(response.data);
    };
    fn();
  }, []);

  return (
    <div className="summary">
      <div className="row">
        <Sales sales={reports.sales} />
        <NoOfTrans sum={reports.numberOfTransactions} />
      </div>
      <div className="row">
        <PayMethodTable list={reports.reportsForPaymentMethod} />
      </div>
    </div>
  );
};
