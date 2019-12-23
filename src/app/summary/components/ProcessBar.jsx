import React from "react";
import { uniqueId } from "lodash";
import { getColor } from "../helpers";
import { Loading } from "../../shared";

export default ({ list, handleOnClick }) => {
  if (!list) {
    return <Loading />;
  }
  return (
    <div className="process-bar">
      {list.map(item => {
        console.log(item);

        return (
          <div
            key={uniqueId("process-bar-div")}
            style={{
              backgroundColor: getColor(item.paymenttype),
              width: `${item.percentage}%`,
              height: `100%`
            }}
          />
        );
      })}
      <div className="selector" onClick={handleOnClick}>
        <img src="http://kidsnparty.com.au/report/selector.svg" alt="" />
      </div>
    </div>
  );
};
