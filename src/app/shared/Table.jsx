import React, { useState, useEffect } from "react";
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

  const [tableData, setTableData] = useState([]);
  const initSortOrders = dataFormat.reduce((init = {}, property) => {
    return { ...init, [property.value]: 0 };
  });
  const [sortOrders, setSortOrders] = useState(initSortOrders);

  useEffect(() => {
    setTableData(data);
  }, []);

  const sort = property => {
    const sortOrder =
      sortOrders[property] === 0 || sortOrders[property] === -1 ? 1 : -1;
    setSortOrders({ ...initSortOrders, [property]: sortOrder });
    const sortedTableData = tableData.sort(dynamicSort(property, sortOrder));
    setTableData(sortedTableData);
  };

  return (
    <table>
      {renderThead(ths, sort, dataFormat)}
      {renderTbody(tableData, dataFormat)}
    </table>
  );
};

//** */
const renderThead = (ths, sort, dataFormat) => {
  let index = -1;
  return (
    <thead>
      <tr>
        {ths.map(th => {
          index++;
          return (
            <th
              onClick={() => {
                sort(dataFormat[index].value);
              }}
              key={_.uniqueId("th")}
            >
              <span className={th.type}>{th.value}</span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const renderTbody = (data, dataFormat) => {
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
