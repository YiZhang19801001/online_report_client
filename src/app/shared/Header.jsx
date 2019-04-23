import React from "react";
import { history } from "./history";
export default ({ show }) => {
  return (
    <div className={`header ${show ? "" : "hide"}`}>
      <button
        onClick={() => {
          history.push(`${process.env.PUBLIC_URL}/daily`);
        }}
      >
        <i className="material-icons">assessment</i>
        <span>daily</span>
      </button>
      <button
        onClick={() => {
          history.push(`${process.env.PUBLIC_URL}/weekly`);
        }}
      >
        <i className="material-icons">assessment</i>
        <span>weekly</span>
      </button>
      <button
        onClick={() => {
          history.push(`${process.env.PUBLIC_URL}/monthly`);
        }}
      >
        <i className="material-icons">assessment</i>
        <span>monthly</span>
      </button>
      <button
        onClick={() => {
          history.push(`${process.env.PUBLIC_URL}/customize`);
        }}
      >
        <i className="material-icons">assessment</i>
        <span>more...</span>
      </button>
    </div>
  );
};
