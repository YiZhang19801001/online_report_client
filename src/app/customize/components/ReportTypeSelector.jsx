import React, { useState } from "react";
import { uniqueId } from "lodash";
export default () => {
  const [reportType, setReportType] = useState("text label");
  const options = ["sales by products", "sales by hours", "sales by store"];
  return (
    <div className="flat-block">
      <span className="title">select report type</span>
      <select
        value={reportType}
        onChange={e => {
          setReportType(e.target.value);
        }}
      >
        {renderOptions(options)}
      </select>
    </div>
  );
};

const renderOptions = data => {
  return (
    <>
      <option value="text label" disabled={true}>
        please select report type
      </option>
      {data.map(item => {
        return (
          <option key={uniqueId("options")} value={item}>
            {item}
          </option>
        );
      })}
    </>
  );
};
