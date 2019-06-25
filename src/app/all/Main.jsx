import React from "react";
import {
  ReportTypeSelector,
  QuickDatePicker,
  TimePeriodSelector
} from "./components";
import { Header } from "../shared";
export default props => {
  return (
    <>
      <Header show={true} {...props} />
      <div className="component-custom-report">
        <ReportTypeSelector />
        <QuickDatePicker />
        <TimePeriodSelector />
      </div>
    </>
  );
};
