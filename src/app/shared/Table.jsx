import React from "react";
import _ from "lodash";

export default ({ ths, data, dataFormat }) => {
  console.log({ ths, data, dataFormat });
  if (!ths || !data || ths.length === 0) {
    return `loading...`;
  } else if (data.length === 0) {
    return <p>no data avaliable</p>;
  }
  return (
    <table>
      {renderThead(ths)}
      {renderTbody(ths, data, dataFormat)}
    </table>
  );
};

const renderThead = ths => {
  return (
    <thead>
      <tr>
        {ths.map(th => {
          return <th key={th}>{th}</th>;
        })}
      </tr>
    </thead>
  );
};

const renderTbody = (ths, data, dataFormat) => {
  return (
    <tbody>
      {data.map(row => {
        return (
          <tr key={_.uniqueId("tableRow")}>{renderTds(dataFormat, row)}</tr>
        );
      })}
    </tbody>
  );
};

const renderTds = (dataFormat, row) => {
  return dataFormat.map(perporty => {
    return <td key={_.uniqueId("tableRowTd")}>{row[perporty]}</td>;
  });
};
