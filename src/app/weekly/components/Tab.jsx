import React from "react";

export default ({ tab }) => {
  const { backgroundColor, img } = makeStyles(tab);

  return (
    <span style={{ backgroundColor }}>
      {img ? <img src={img} /> : tab.split(" ").join("\n")}
    </span>
  );
};

const makeStyles = value => {
  switch (value.toLowerCase()) {
    case "eftpos":
      return { backgroundColor: "#f95c15" };
    case "redpayments":
      return { backgroundColor: "#f32c3b", img: "http://kidsnparty.com.au/report/redpayments.svg" };
    case "eftpos offline":
      return { backgroundColor: "#feae32" };
    case "visa/master":
      return { backgroundColor: "#3abeb9", img: "http://kidsnparty.com.au/report/visa-master.svg" };
    case "amex":
      return { backgroundColor: "#2358e7", img: "http://kidsnparty.com.au/report/amex.svg" };
    case "cash":
      return { backgroundColor: "#6b7ee9" };
    default:
      return { backgroundColor: "#7162DF" };
  }
};
