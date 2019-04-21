import React from "react";
import { Loading } from "../shared";

export default ({ sum }) => {
  return (
    <div className="block">
      <span className="title">no. of trans</span>
      <span className="value">{sum ? parseInt(sum) : <Loading />}</span>
    </div>
  );
};
