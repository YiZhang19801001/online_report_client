import React from "react";

export default ({ table_status = "all", dispatch, tableStats }) => {
  const { all, available, occupied, reserve } = tableStats;
  return (
    <div className={"tables-filter"}>
      <div className={"tables-filter__row"}>
        <div
          className={`table-filter__button ${
            table_status === "available" ? "active" : ""
          }`}
          onClick={e => {
            e.preventDefault();
            dispatch({
              type: "setState",
              payload: {
                table_status_id: 0,
                table_status: "available"
              }
            });
          }}
        >
          <div className={"tables-filter__button__indicator"}>
            <div className={`round`} />
          </div>
          <div className={"tables-filter__button__label"}>
            <span>available</span>
            <span>{available}</span>
          </div>
        </div>
        <div
          className={`table-filter__button ${
            table_status === "occupied" ? "active" : ""
          }`}
          onClick={e => {
            e.preventDefault();
            dispatch({
              type: "setState",
              payload: {
                table_status_id: 2,
                table_status: "occupied"
              }
            });
          }}
        >
          <div className={"tables-filter__button__indicator"}>
            <div className={`round`} />
          </div>
          <div className={"tables-filter__button__label"}>
            <span>occupied</span>
            <span>{occupied}</span>
          </div>
        </div>
      </div>
      <div className={"tables-filter__row"}>
        <div
          className={`table-filter__button ${
            table_status === "reserved" ? "active" : ""
          }`}
          onClick={e => {
            e.preventDefault();
            dispatch({
              type: "setState",
              payload: {
                table_status_id: 3,
                table_status: "reserved"
              }
            });
          }}
        >
          <div className={"tables-filter__button__indicator"}>
            <div className={`round`} />
          </div>
          <div className={"tables-filter__button__label"}>
            <span>reserved</span>
            <span>{reserve}</span>
          </div>
        </div>
        <div
          className={`table-filter__button ${
            table_status === "all" ? "active" : ""
          }`}
          onClick={e => {
            e.preventDefault();
            dispatch({
              type: "setState",
              payload: {
                table_status_id: null,
                table_status: "all"
              }
            });
          }}
        >
          <div className={"tables-filter__button__indicator"}>
            <div className={`round`} />
          </div>
          <div className={"tables-filter__button__label"}>
            <span>all</span>
            <span>{all}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
