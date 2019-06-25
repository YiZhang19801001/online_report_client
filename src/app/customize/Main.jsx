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
  table_status: "all"
};

export default props => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { isLoading, table_status_id, table_status } = state;
  const tables = fetchTables(table_status_id, dispatch);

  return (
    <>
      <Header show={true} {...props} />
      <div className="component-tables-report">
        <TableFilter table_status={table_status} dispatch={dispatch} />
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
