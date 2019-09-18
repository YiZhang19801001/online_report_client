import React, { useReducer, useEffect, useState } from "react";
import { uniqueId } from "lodash";
import { Header, Loading } from "../shared";
import moment from "moment";
import { fetchReports } from "./hooks";
import { ShopSummaryCard, GroupSummary, AgentSummary } from "./components";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    case "setDate":
      return { ...state, date: { ...state.date, ...action.payload } };
    case "setTag":
      return { ...state, currentTag: action.payload }
    default:
      break;
  }
};

const zone = "Australia/Sydney";

const initState = {
  isLoading: true,
  date: {
    startDate: moment.utc()
      .add("minutes", zone)
      .startOf("day"),
    endDate: moment.utc()
      .endOf("day")
      .add("minutes", zone)
  },
};

const colorRange = ['#755ce0', '#4a7ee1', '#5268ca'];

export default props => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { isLoading, date } = state;
  const { startDate, endDate } = date;
  const [currentTag, setTag] = useState('shop');
  const [drawer, setDrawer] = useState('');
  const [showAgent, setShowAgent] = useState(false);

  let reports = fetchReports(date, dispatch, '', '');

  const user_type = JSON.parse(localStorage.getItem("aupos_online_report_user")).user_type;
  const getTotalSales = () =>
    !reports.groupSummary && reports.reduce((sum, report) => sum + parseFloat(report.totalSales || 0), 0);

  const getTotalTx = () =>
    !reports.groupSummary && reports.reduce((sum, report) => sum + parseInt(report.totalTx || 0), 0);


  return (
    <>
      <Header show={true} hideNavBar={true} {...props} showAgent={showAgent} currentTag={currentTag} setShowAgent={setShowAgent} />
      {currentTag==='shop'&&isLoading && <Loading />}
      {
        user_type === 'GIFTSHOPHEAD' && <div style={{ display: 'flex', justifyContent: "center",width:'18rem',margin:'auto' }}>
          <div className={`header-container`}>
            <div className={currentTag === 'shop' ? `border sub-container` : 'sub-container'} onClick={() => {setTag('shop');setShowAgent(false)}}>
              <span >Shop</span>
            </div>
            <div className={currentTag === 'group' ? `border sub-container` : 'sub-container'} onClick={() => {setTag('group');setShowAgent(false)}}>
              <span>Group</span>
            </div>
            <div className={currentTag === 'agent' ? `border sub-container` : 'sub-container'} onClick={() => setTag('agent')}>
              <span>Agent</span>
            </div>
          </div>
        </div>
      }
      <div className={user_type === 'GIFTSHOPHEAD' ? `date-picker` : `date-picker margin-top`}>
        <input
          type="date"
          value={startDate.format("YYYY-MM-DD")}
          max={endDate.format("YYYY-MM-DD")}
          onChange={e => {
            dispatch({
              type: "setDate",
              payload: { startDate: moment(e.target.value).startOf("day") }
            });
          }}
        />

        <input
          type="date"
          value={endDate.format("YYYY-MM-DD")}
          min={startDate.format("YYYY-MM-DD")}
          onChange={e => {
            console.log({ date: moment(e.target.value).endOf("day") });
            dispatch({
              type: "setDate",
              payload: { endDate: moment(e.target.value).endOf("day") }
            });
          }}
        />
      </div>
      {
        currentTag === 'shop' &&
        <div className="component-total-report">
          <div className="total-summary"style={{marginTop:'1.5rem'}}>
            <div className="total-summary__sales">
              <div className="title">Sales:</div>
              <div className="value">
                ${parseFloat(getTotalSales()).toFixed(2)}
              </div>
            </div>
            <div className="total-summary__tx">
              <div className="title">Transactions:</div>
              <div className="value">{getTotalTx()}</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'1rem'}}>
            <div className="shop-list">
              {!reports.groupSummary && reports.map(report => {
                return (
                  <ShopSummaryCard report={report} key={uniqueId("shopSummary")} />
                );
              })}
            </div>
          </div>
        </div>
      }

      {/* Group Summary */}
      {
        (currentTag === 'group')&&<GroupSummary drawer={drawer} setDrawer={setDrawer} date={date}/>
      }
      {/* Group Summary */}

      {/* Agent Summary */}
      {
        (currentTag === 'agent')&&<AgentSummary date={date} showAgent={showAgent} setShowAgent={setShowAgent}/>
      }
      {/* Agent Summary */}

    </>
  );
};
