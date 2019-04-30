import React from "react";
import Tab from "./Tab";
import { uniqueId } from "lodash";

export default ({ tabs }) => {
  return (
    <div className="tabs-group">
      <Tab tab={"Week"} />
      <Tab tab={"Tx"} />
      <Tab tab={"Sales"} />
      {tabs.map(tab => {
        return <Tab tab={tab} key={uniqueId("payment tab")} />;
      })}
    </div>
  );
};
