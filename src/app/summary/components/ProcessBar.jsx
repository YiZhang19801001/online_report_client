import React from "react";
import { uniqueId } from "lodash";
import { getColor } from "../helpers";
export default ({ list }) => {
  const data = list
    ? list
    : [
        { name: "wechat", value: 0.2 },
        { name: "redpayments", value: 0.3 },
        { name: "cash", value: 0.5 }
      ];
  return (
    <div className="process-bar">
      {data.map(item => {
        return (
          <div
            key={uniqueId("process-bar-div")}
            style={{
              backgroundColor: getColor(item.name),
              width: `${item.value * 100}%`,
              height: `100%`
            }}
          />
        );
      })}
    </div>
  );
};
