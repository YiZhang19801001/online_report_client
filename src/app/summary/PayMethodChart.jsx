import React from "react";
import { Pie } from "react-chartjs-2";
import { Loading } from "../shared";
export default ({ list }) => {
  if (!list) {
    return (
      <div className="block large">
        <span className="title">Sales by Payment Method</span>
        <Loading />
      </div>
    );
  }
  const labels = list.map(item => {
    return item.paymenttype;
  });

  const data = list.map(item => {
    return item.total;
  });

  const backgroundColor = list.map(item => {
    switch (item.paymenttype.toLowerCase()) {
      case "wechat":
        return `#56B849`;
      case "cash":
        return `#ffba2d`;
      case "eftpos offline":
        return `#00AAEE`;
      case "redpayments":
        return `#E50112`;
      case "eftpos":
        return `#56B849`;
      case "amex":
        return `#56B0EC`;
      case "visa/master":
      case "visa":
      case "master":
        return `#016272`;
      default:
        return `#a5a5a5`;
    }
  });

  const chartData = {
    datasets: [
      {
        data,
        backgroundColor
      }
    ],
    backgroundColor,
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels
  };
  return (
    <div className="block large">
      <span className="title">Sales by Payment Method</span>
      <Pie data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};
