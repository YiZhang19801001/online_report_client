import React from "react";
import { uniqueId } from "lodash";

export default ({ reportType, dispatch }) => {
  const options = [
    { value: "product", text: "sales by products" },
    { value: "category", text: "sales by category" },
    { value: "hour", text: "sales by hours" },
    { value: "day", text: "sales by day" },
    { value: "customer", text: "customer report" }
  ];

  return (
    <div className="flat-block">
      <span className="title">select report type</span>
      <select
        value={reportType}
        onChange={e => {
          dispatch({
            type: "setState",
            payload: { reportType: e.target.value }
          });
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
        const { value, text } = item;
        return (
          <option key={uniqueId("reportType")} value={value}>
            {text}
          </option>
        );
      })}
    </>
  );
};
