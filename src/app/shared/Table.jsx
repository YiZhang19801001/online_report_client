import React, { useState, useEffect } from "react";
import _ from "lodash";
import Loading from "./Loading";

/**
 * main function component
 */
export default ({ ths, data, dataFormat, sum }) => {
  if (!ths || !data || ths.length === 0) {
    return <Loading />;
  } else if (data.length === 0) {
    return <p>no data avaliable</p>;
  }

  const [tableData, setTableData] = useState([]);
  const initSortOrders = dataFormat.reduce((init, property) => {
    return { ...init, [property.value]: 0 };
  }, {});
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
      {renderTbody(tableData, dataFormat, sum)}
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
              className={th.type}
            >
              <span>{th.value}</span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const renderTbody = (data, dataFormat, sum) => {
  let index = 0;
  return (
    <tbody>
      {data.map(row => {
        index++;

        return (
          <tr
            key={_.uniqueId("tableRow")}
            className={`${index % 2 !== 0 ? "colored" : ""}`}
          >
            {renderTds(dataFormat, row)}
          </tr>
        );
      })}
      {sum ? (
        <tr className={`total`}>{renderTotalRow(dataFormat, data)}</tr>
      ) : null}
    </tbody>
  );
};

const renderTds = (dataFormat, row) => {
  return dataFormat.map(property => {
    return (
      <td key={_.uniqueId("tableRowTd")} className={property.type}>
        {row[property.value]}
      </td>
    );
  });
};
const renderTotalRow = (dataFormat, data) => {
  return dataFormat.map((property, index) => {
    if (index === 0) {
      return (
        <td key={_.uniqueId("tableRowTd")}>
          <span>{`Total`}</span>
        </td>
      );
    }
    if (property.type !== "number") {
      return <td key={_.uniqueId("tableRowTd")} />;
    }
    return (
      <td key={_.uniqueId("tablRowTd")} className={property.type}>
        <span> {calculateSum(property.value, data)}</span>
      </td>
    );
  });
};

const calculateSum = (property, data) => {
  if (data.length === 0) {
    return 0;
  }
  return data.reduce((total, item) => {
    return total + parseFloat(item[property]);
  }, 0);
};

const dynamicSort = (property, sortOrder) => {
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};
