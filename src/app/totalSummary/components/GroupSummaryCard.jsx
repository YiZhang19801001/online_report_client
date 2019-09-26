import React, { useEffect } from "react";
import { history } from "../../shared";


const array_chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

export default ({ report, name, setShowAgent, setAgentName }) => {
  const {
    kb,
    pax,
    shopReports,
    guide,
  } = report;
  const keyList = array_chunks(Object.keys(shopReports), 2);
  const user_type = JSON.parse(localStorage.getItem("aupos_online_report_user")).user_type;

  return (
    <div className={`shop-summary-card`}>
      <div className="row shop-name column">
        <div className={`sub-row`}>
          <span className={`group-edition`}>{name}</span>
          <span className={`group-edition`}>{pax}
            <span className={`pax`}>pax</span>
          </span>
        </div>
        <div className={`sub-row`}>
          <span className={`guide`}>Guide:
            <span className={`guide-name`}>{guide}</span>
          </span>
          <span className={`kb`}>{kb}</span>
        </div>
      </div>
      {keyList.map((l, index) => {
        return (
          <div className="row shop-report-data" key={index}>
            {
              l.map((k) => {
                return (
                  <div className={`report`} key={k}>
                    <div className={`title`}>{k}</div>
                    <div className={`value`}>${shopReports[k]}</div>
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
