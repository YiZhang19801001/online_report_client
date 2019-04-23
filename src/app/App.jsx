import React from "react";
import Routes from "./routes";
import { checkLogin } from "./shared/hooks";
import "./App.css";
export default () => {
  checkLogin();
  return (
    <div className="app">
      <Routes />
    </div>
  );
};
