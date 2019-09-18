import React, { useEffect } from "react";
import { history } from "../../shared";


const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

export default ({ report, name, setShowAgent, setAgentName }) => {
  const {
    summary,
  } = report;
  const { pax, shopTotal } = summary;
  const keyList = array_chunks(Object.keys(shopTotal), 2);
  const user_type = JSON.parse(localStorage.getItem("aupos_online_report_user")).user_type;
  const onClick = () => {
    setShowAgent(true);
    setAgentName(name);
  };

  return (
    <div className={`shop-summary-card`}>
      <div className="row shop-name" onClick={onClick}>
        <span>{name}</span>
        <span>{pax}
          <span className={`pax`}>pax</span>
        </span>
      </div>
      {keyList.map((l,index) => {
        return (
          <div className="row shop-report-data" key={index}>
            {
              l.map((k) => {
                return (
                  <div className={`report`} key={k}>
                    <div className={`title`}>{k}</div>
                    <div className={`value`}>${shopTotal[k]}</div>
                  </div>
                )
              })
            }
          </div>
        )
      })}
    </div>
  );
};
