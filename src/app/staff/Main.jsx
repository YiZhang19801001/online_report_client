import React, { useEffect, useState, useCallback, useReducer } from "react";
import { Header, userAuth, Loading } from "../shared";
import moment from "moment";
import axios from "axios";
import { apiUrl } from "../shared/constants";
const reducer = (state, action) => {
    switch (action.type) {
        case "setState":
            return { ...state, ...action.payload };
        case "setDate":
            return { ...state, date: { ...state.date, ...action.payload } };
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

export default function Main(props) {
    const { shopId } = props.match.params;
    const [showHeader, setShowHeader] = useState(true);
    const [state, dispatch] = useReducer(reducer, initState);
    const { isLoading, date } = state;
    const { startDate, endDate } = date;
    const [reports,setReports] = useState({});

    useEffect(() => {     
        const fn = async () => {
            dispatch({type:'setState',payload:{isLoading:true}});
          const response = await axios.put(
            `${apiUrl}/reports/${shopId?shopId:`1`}`,
            {
                startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
                endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
                shopId:shopId?shopId:`1`,
                reportType:"staff"
            },
            {
              headers: {
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("aupos_online_report_user"))
                    .access_token
                  }`
              }
            }
          );
          console.log(response.data.reports)
            setReports(response.data.reports);
            dispatch({type:'setState',payload:{isLoading:false}});
        };
        fn();
      }, [date,shopId]);

    let preScrollPosition = 0;
    useEffect(() => {
        const dom = document.querySelector("#group-page");
        const handleScroll = () => {
            if (preScrollPosition > dom.scrollTop) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
            preScrollPosition = dom.scrollTop;
        };
        dom.addEventListener("scroll", handleScroll);

        return () => {
            dom.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <>
            <Header show={showHeader} {...props} />
            <div className={`group-summary-page`} id="group-page">

                <div className={`date-picker`}>
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

                <div className="component-total-report">
                    <div className="total-summary" style={{ marginTop: '1.5rem' }}>
                        <div className="total-summary__sales">
                            <div className="title">Sales:</div>
                            <div className="value margin font">
                                ${reports.summary&&reports.summary.sales.toFixed(2)}
                            </div>
                        </div>
                        <div className="group-summary">
                            <div className={`group-title`}>
                                <span className={`route`}>GP$</span>
                                <span className={`gp`}>${reports.summary&&reports.summary.gp.toFixed(2)}</span>
                            </div>
                            <div className={`group-title margin-top`}>
                                <span className={`route`}>GP%</span>
                                <span className={`gp`}>{reports.summary&&(reports.summary.gp_percentage*100).toFixed(2)}%</span>
                            </div>
                            <div className={`group-title margin-top`}>
                                <span className={`route`}>Count</span>
                                <span className={`gp font`}>{reports.summary&&reports.summary.count}</span>
                            </div>
                        </div>
                    </div>


                    <div className={`group-page-table`}>
                    {isLoading&&<Loading/>}
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#4a4a4a', color: 'white',padding:'0.1rem 0',width:'5.8rem' }}>
                                        <span className={`underline`}>#</span>
                                        <span>Staff</span>
                                        </th>
                                    
                                    <th style={{ backgroundColor: '#755ce0', color: 'white',width:'1rem'}}>Count</th>
                                    <th style={{ backgroundColor: '#4a7ee1', color: 'white',width:'5.8rem' }}>Sales</th>
                                    <th style={{ backgroundColor: '#5268ca', color: 'white',width:'5rem' }}>GP$</th>
                                    <th style={{ backgroundColor: '#4a7ee1', color: 'white',width:"1rem" }}>GP%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.details&&reports.details.map((d,i)=>{
                                    return (
                                        <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '' : '#f6f5f9' }}>
                                            <td>
                                                <span className={`barcode`}>{d.barcode}</span>
                                                <span>{d.groupName}</span>
                                            </td>
                                            <td>{d.count}</td>
                                            <td>${parseFloat(d.sales).toFixed(2)}</td>
                                            <td>${parseFloat(d.gp).toFixed(2)}</td>
                                            <td>{(parseFloat(d.gp_percentage*100)).toFixed(2)}%</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </>
    )
}
