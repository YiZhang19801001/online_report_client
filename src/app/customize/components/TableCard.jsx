import React from "react";

export default ({ table }) => {
  const { table_id, table_code, table_status, seats, site } = table;

  const getTableClass = () => {
    switch (table_status) {
      case "1":
        return `table-card table-status3`;

      case "0":
        return `table-card`;
      default:
        return `table-card table-status2`;
    }
  };

  return (
    <div className={getTableClass()}>
      <div className={"table_code"}>{table_code}</div>
      <div className={"site-name"}>{site.site_name}</div>
      <div className={"seats"}>{seats}</div>
    </div>
  );
};
