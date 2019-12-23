import React, { useEffect, useState, useCallback, useReducer } from "react";
import { Header, userAuth, Loading } from "../shared";
import { useMappedState, useDispatch } from "redux-react-hook";
import moment from "moment";
import axios from "axios";
import { apiUrl } from "../shared/constants";
const reducer = (state, action) => {
    switch (action.type) {
        case "setState":
            return { ...state, ...action.payload };
        // case "setDate":
        //     return { ...state, date: { ...state.date, ...action.payload } };
        default:
            break;
    }
};

const zone = "Australia/Sydney";

const initState = {
    isLoading: true,
    // date: {
    //     startDate: moment.utc()
    //         .add("minutes", zone)
    //         .startOf("day"),
    //     endDate: moment.utc()
    //         .endOf("day")
    //         .add("minutes", zone)
    // },
};

let preScrollPosition = 0;

function Main(props) {
    const mapState = useCallback(({ dateStart, dateEnd }) => ({ dateStart, dateEnd }), []);
    const { dateStart, dateEnd } = useMappedState(mapState);
    const dispatch = useDispatch();
    const { shopId } = props.match.params;
    const [showHeader, setShowHeader] = useState(true);
    const [state, dispatc] = useReducer(reducer, initState);
    const { isLoading } = state;
    const [reports, setReports] = useState({});

    useEffect(() => {
        const fn = async () => {
            dispatc({ type: 'setState', payload: { isLoading: true } });
            const response = await axios.put(
                `${apiUrl}/reports/${shopId ? shopId : `1`}`,
                {
                    startDate: dateStart.format('YYYY-MM-DD HH:mm:ss'),
                    endDate: dateEnd.format('YYYY-MM-DD HH:mm:ss'),
                    shopId: shopId ? shopId : `1`,
                    reportType: "customer"
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
            dispatc({ type: 'setState', payload: { isLoading: false } });
        };
        fn();
    }, [dateStart, dateEnd, shopId]);


    useEffect(() => {
        const dom = document.querySelector("#group-page");
        const handleScroll = () => {
            if (preScrollPosition > dom.scrollTop && dom.scrollTop / preScrollPosition < 0.7) {
                setShowHeader(true);
            } else if (preScrollPosition < dom.scrollTop && dom.scrollTop / preScrollPosition > 1.5) {
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

                <div
                    style={{
                        height: 'max-content',
                        paddingBottom: '15rem',
                    }}
                >
                    <div className={`date-picker`} style={{ marginBottom: '0rem' }}>
                        <input
                            type="date"
                            value={dateStart.format("YYYY-MM-DD")}
                            max={dateEnd.format("YYYY-MM-DD")}
                            onChange={e => {
                                dispatch({
                                    type: "setDateStart",
                                    payload: moment(e.target.value).startOf("day")
                                });
                            }}
                        />
                        <input
                            type="date"
                            value={dateEnd.format("YYYY-MM-DD")}
                            min={dateStart.format("YYYY-MM-DD")}
                            onChange={e => {
                                console.log({ date: moment(e.target.value).endOf("day") });
                                dispatch({
                                    type: "setDateEnd",
                                    payload: moment(e.target.value).endOf("day")
                                });
                            }}
                        />
                    </div>

                    <div className="component-total-report">
                        <div className="total-summary" style={{ marginTop: '0rem' }}>
                            <div className="total-summary__sales">
                                <div className="title">Sales:</div>
                                <div className="value margin font">
                                    ${reports.summary && reports.summary.sales.toFixed(2)}
                                </div>
                            </div>
                            <div className="group-summary" style={{
                                justifyContent:
                                    'space-between'
                            }}>
                                <div className={`group-title`}>
                                    <span className={`route`}>GP$</span>
                                    <span className={`gp`}>${reports.summary && reports.summary.gp.toFixed(2)}</span>
                                </div>
                                <div className={`group-title margin-top`}>
                                    <span className={`route`}>GP%</span>
                                    <span className={`gp`}>{reports.summary && (reports.summary.gp_percentage * 100).toFixed(2)}%</span>
                                </div>
                                <div className={`group-title margin-top`}>
                                    <span className={`route`}>Count</span>
                                    <span className={`gp font`}>{reports.summary && reports.summary.count}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={`group-page-table`}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#4a4a4a', color: 'white', padding: '0.1rem 0', width: '7rem' }}>
                                        <span className={`underline`}>Guide</span>
                                        <span >Group</span>
                                    </th>

                                    <th style={{ backgroundColor: '#755ce0', color: 'white', width: '1rem' }}>Count</th>
                                    <th style={{ backgroundColor: '#4a7ee1', color: 'white', width: '5.8rem' }}>Sales</th>
                                    <th style={{ backgroundColor: '#5268ca', color: 'white', width: '5rem' }}>GP$</th>
                                    <th style={{ backgroundColor: '#4a7ee1', color: 'white', width: "4.5rem" }}>GP%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading && <Loading />}
                                {reports.details && reports.details.map((d, i) => {
                                    return (
                                        <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '' : '#f6f5f9' }}>
                                            <td style={{ width: '7rem' }}>
                                                {/* <span className={`barcode`}>{d.barcode}</span> */}
                                                <span>{d.guide}</span>
                                                <span>{d.groupName}</span>
                                            </td>
                                            <td style={{ width: '4rem' }}>{d.count}</td>
                                            <td style={{ width: '5.8rem' }}>${parseFloat(d.sales).toFixed(2)}</td>
                                            <td style={{ width: '5rem' }}>${parseFloat(d.gp).toFixed(2)}</td>
                                            <td style={{ width: '4.5rem' }}>{(parseFloat(d.gp_percentage * 100)).toFixed(2)}%</td>
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

export default Main;
