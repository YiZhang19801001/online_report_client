import React, { useState, useEffect } from "react";
import _ from "lodash";
import Loading from "./Loading";
import { getColor } from "../summary/helpers";

/**
 * main function component
 */
export default ({ ths, data, dataFormat, sum, striped }) => {
  if (!ths || !data || ths.length === 0) {
    return <Loading />;
  } else if (data.length === 0) {
    return <Loading />;
  }

  const [tableData, setTableData] = useState([]);
  const initSortOrders = dataFormat.reduce((init, property) => {
    return { ...init, [property.value]: 0 };
  }, {});
  const [sortOrders, setSortOrders] = useState(initSortOrders);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sort = property => {
    const sortOrder =
      sortOrders[property] === 0 || sortOrders[property] === -1 ? 1 : -1;
    setSortOrders({ ...initSortOrders, [property]: sortOrder });
    const sortedTableData = tableData.sort(dynamicSort(property, sortOrder));
    setTableData(sortedTableData);
  };

  return (
    <table>
      {renderThead(ths, sort, dataFormat, sortOrders)}
      {renderTbody(tableData, dataFormat, sum, striped)}
    </table>
  );
};

//** */
const renderThead = (ths, sort, dataFormat, sortOrders) => {
  let index = -1;
  return (
    <thead>
      <tr>
        {ths.map(th => {
          index++;
          const propertyName = dataFormat[index].value;
          const orderStatus =
            sortOrders[propertyName] === 0 || sortOrders[propertyName] === 1
              ? "increase"
              : "decrease";

          return (
            <th
              onClick={() => {
                sort(propertyName);
              }}
              key={_.uniqueId("th")}
              className={th.type}
            >
              <span className="th-content-container">
                <span className="th-title">{th.value}</span>
                {th.type === "number" && (
                  <span className={`th-symbol ${orderStatus}`}>
                    {sortOrders[propertyName] !== 0 ? (
                      <img
                        src="http://kidsnparty.com.au/report/table-sorting.svg"
                        alt=""
                      />
                    ) : (
                        <img src="http://kidsnparty.com.au/report/table-unsorting.svg" />
                      )}
                  </span>
                )}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const renderTbody = (data, dataFormat, sum, striped) => {
  let index = 0;
  return (
    <tbody>
      {data.map(row => {
        index++;

        return (
          <tr
            key={_.uniqueId("tableRow")}
            className={`${index % 2 !== 0 ? "colored" : ""} ${
              striped ? "striped" : ""
              }`}
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
        {renderTdPrefix(property.value, row[property.value])}
        <span>
          {property.type === "number"
            ? property.value === "quantity"
              ? parseInt(row[property.value])
              : property.value === "gp_percentage" ||
                property.value === "percentage"
                ? `${Math.round(parseFloat(row[property.value]) * 10000) / 100}%`
                : parseFloat(row[property.value]).toFixed(2)
            : row[property.value]}
        </span>
      </td>
    );
  });
};
const renderTdPrefix = (value, name) => {
  switch (value) {
    case "total":
    case "amount":
      return <span className="symbol">$</span>;
    case "paymenttype":
      return (
        <span
          className="payment-method-symbol"
          style={{ borderColor: getColor(name) }}
        />
      );
    case "size":
      return <span className="placeholder" />;
    default:
      return null;
  }
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
  return function (a, b) {
    var result =
      parseFloat(a[property]) < parseFloat(b[property])
        ? -1
        : parseFloat(a[property]) > parseFloat(b[property])
          ? 1
          : 0;
    return result * sortOrder;
  };
};
