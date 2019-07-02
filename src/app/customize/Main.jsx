import React, { useReducer } from "react";
import { uniqueId } from "lodash";
import { fetchTables } from "./hooks";
import { Header, Loading } from "../shared";
import { TableCard, TableFilter } from "./components";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    default:
      break;
  }
};

const initState = {
  isLoading: true,
  table_status_id: null,
  table_status: "all",
  site_id: "all"
};

export default props => {
  const { shopId } = props.match.params;

  const [state, dispatch] = useReducer(reducer, initState);
  const { isLoading, table_status_id, table_status, site_id } = state;
  const { tables, tableStats } = fetchTables(
    table_status_id,
    dispatch,
    shopId,
    site_id
  );

  return (
    <>
      <Header show={true} {...props} />
      <div className="component-tables-report">
        <TableFilter
          table_status={table_status}
          dispatch={dispatch}
          tableStats={tableStats}
          shopId={shopId}
          site_id={site_id}
        />
        <div className={"tables-grid"}>
          {isLoading && <Loading />}
          {tables.length === 0 && (
            <div className={"text-notice"}>No Data Found</div>
          )}
          {tables.map(table => {
            return <TableCard table={table} key={uniqueId("table-card")} />;
          })}
        </div>
      </div>
    </>
  );
};
