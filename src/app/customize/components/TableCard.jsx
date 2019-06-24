import React from "react";

export default ({ table }) => {
  const { table_id, table_code, table_status, seats } = table;
  return (
    <div className={`table-card ${`table-status${table_status}`}`}>
      <div className={"table_code"}>{table_code}</div>
      <div className={"seats"}>{seats}</div>
    </div>
  );
};
