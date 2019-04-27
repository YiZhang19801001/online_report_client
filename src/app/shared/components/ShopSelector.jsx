import React from "react";

export default ({ shop }) => {
  return (
    <div className="shop-selector">
      <div className="selector">
        <span className="value">{shop}</span>
        <span className="indicator">
          <img src="/selector.svg" alt="" />
        </span>
      </div>
    </div>
  );
};
