import React from "react";
import _ from "lodash";
import Loading from "./Loading";

/**
 * main function component
 */
export default ({ ths, data, dataFormat }) => {
  if (!ths || !data || ths.length === 0) {
    return <Loading />;
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

//** */
const renderThead = ths => {
  return (
    <thead>
      <tr>
        {ths.map(th => {
          return (
            <th key={_.uniqueId("th")}>
              <span className={th.type}>{th.value}</span>
            </th>
          );
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
    return (
      <td key={_.uniqueId("tableRowTd")} className={perporty.type}>
        {row[perporty.value]}
      </td>
    );
  });
};

const dynamicSort = (property, sortOrder) => {
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};
