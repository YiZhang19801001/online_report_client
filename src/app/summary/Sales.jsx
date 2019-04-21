import React from "react";
import { Loading } from "../shared";

export default ({ sales }) => {
  return (
    <div className="block">
      <span className="title">sales</span>
      <span className="value">
        {sales ? parseFloat(sales).toFixed(2) : <Loading />}
      </span>
    </div>
  );
};
