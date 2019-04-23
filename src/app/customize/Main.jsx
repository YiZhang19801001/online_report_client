import React from "react";
import {
  ReportTypeSelector,
  QuickDatePicker,
  TimePeriodSelector
} from "./components";
export default () => {
  return (
    <div className="component-custom-report">
      <ReportTypeSelector />
      <QuickDatePicker />
      <TimePeriodSelector />
    </div>
  );
};
