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
    switch (item.paymenttype) {
      case "wechat":
        return `#56B849`;
      case "cash":
        return `#ffba2d`;
      case "alipay":
        return `#00AAEE`;
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
