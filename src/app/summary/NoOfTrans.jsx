import React from "react";

export default ({ sum }) => {
  return (
    <div className="block">
      <span className="title">no. of trans</span>
      <span className="value">{sum ? parseInt(sum) : "loading..."}</span>
    </div>
  );
};
