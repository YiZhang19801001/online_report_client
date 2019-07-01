import React from "react";
import { uniqueId } from "lodash";
import { Loading } from "../../shared";
import moment from "moment";

export default ({ data, weeks, tabs }) => {
  if (!data) {
    return <Loading />;
  }

  return (
    <div className="table-container">
      <table>
        {renderThead(weeks)}
        {renderTbody(tabs, data)}
      </table>
    </div>
  );
};

const renderThead = (weeks = []) => {
  return (
    <thead>
      <tr className="colored">
        {weeks.map((week, index) => (
          <th key={uniqueId("th")}>
            <span>
              <span className="week-title">{`w ${index + 1}`}</span>
              <span className="week-value">{`${moment(week.from).format(
                "DD"
              )} - ${moment(week.to).format("DD")} ${moment(week.to).format(
                "MMM"
              )}`}</span>
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const renderTbody = (tabs, data) => {
  return (
    <tbody>
      <tr>
        {data.map(value => {
          // value is single week report
          return (
            <td key={uniqueId("tdTx")}>
              <span>{parseFloat(value.tx)}</span>
            </td>
          );
        })}
      </tr>
      <tr className="colored sales">
        {data.map(value => {
          const sales = parseFloat(value.sales);
          // value is single week report
          return (
            <td key={uniqueId("tdSales")}>
              <span>{sales !== 0 ? sales.toFixed(2) : 0}</span>
            </td>
          );
        })}
      </tr>
      {tabs.map((tab, index) => {
        return (
          <tr key={uniqueId("tr")} className={getTrClassName(index)}>
            {renderTds(data, tab)}
          </tr>
        );
      })}
    </tbody>
  );
};

const getTrClassName = index => {
  if (index === 0) {
    return "cash";
  }
  return index % 2 === 0 ? "" : "colored";
};

const renderTds = (data = [], tab) => {
  return data.map(value => {
    //value is single week report
    return (
      <td key={uniqueId("td")}>
        <span>{getPaymentTotal(value.paymentMethodReports, tab)}</span>
      </td>
    );
  });
};

const getPaymentTotal = (listOfPaymentMethod, tab = "") => {
  const result = listOfPaymentMethod.filter(
    item => item.paymenttype.toLowerCase() === tab.toLocaleLowerCase()
  )[0];

  if (result) {
    return result.total !== 0 ? parseFloat(result.total).toFixed(2) : 0;
  }
  return 0;
};

/**
 * *function sorting the weekly reports put paymenttype=='cash' always on the 1st place,
 *  *restructure data into a paymenttype based array;
 *
 * @param {Array} data
 * @returns {Array} results
 */
const reFormatData = (data = [], tabs) => {
  return;
};

const getSales = reports => {
  const total = reports.reduce((sum, item) => sum + parseFloat(item.total), 0);
  return total.toFixed(2);
};
