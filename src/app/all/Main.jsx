import React from "react";
import {
  ReportTypeSelector,
  QuickDatePicker,
  TimePeriodSelector
} from "./components";
import { Header } from "../shared";
export default () => {
  return (
    <>
      <Header show={true} />
      <div className="component-custom-report">
        <ReportTypeSelector />
        <QuickDatePicker />
        <TimePeriodSelector />
      </div>
    </>
  );
};
