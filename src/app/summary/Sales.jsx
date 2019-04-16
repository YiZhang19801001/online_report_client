import React from "react";

export default ({ sales }) => {
  return (
    <div className="block">
      <span className="title">sales</span>
      <span className="value">
        {sales ? parseFloat(sales).toFixed(2) : "loading..."}
      </span>
    </div>
  );
};
