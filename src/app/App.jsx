import React from "react";
import Routes from "./routes";
import { Header } from "./shared";
import "./App.css";
export default () => {
  return (
    <div className="app">
      <Header />
      <Routes />
    </div>
  );
};
