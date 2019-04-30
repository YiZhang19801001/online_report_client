import React from "react";
import { uniqueId } from "lodash";
import { Loading } from "../../shared";
export default ({ data, weeks }) => {
  if (!data) {
    return <Loading />;
  }
  return <table>{renderThead(weeks)}</table>;
};

const renderThead = weeks => {};

const renderTbody = () => {};
