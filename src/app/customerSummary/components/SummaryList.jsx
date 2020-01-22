import React, { useEffect, useReducer, createContext, useCallback } from "react"
import { useMappedState, useDispatch } from "redux-react-hook"
import ShopSummaryCard from "./ShopSummaryCard"
import { Header, CancelRequestNotification } from "../../shared"
import moment from "moment"
import axios from 'axios'

export const CustomerReportSumaryCtx = createContext()



const reducer = (state, action) => {
    let newReports = []

    switch (action.type) {
        case 'SET':

            return { ...state, ...action.payload };
        case "REFRESH_AXIOS_TOKEN":
            let CancelToken = axios.CancelToken;
            let source = CancelToken.source();
            return { ...state, source }
        case "setDate":
            return { ...state, date: { ...state.date, ...action.payload } };
        case "PUSH_LOADING_SHOP":
            return { ...state, loadingShops: [...state.loadingShops, action.payload] }
        case "REMOVE_LOADING_SHOP":
            return { ...state, loadingShops: state.loadingShops.filter(shop => shop.shop_id !== action.payload.shop_id) }
        case "PUSH_REPORT":
            // determine update/add report to state.reports
            let flag = false
            state.reports.forEach(r => {
                if (r.shop && r.shop.shop_id === action.payload.shop.shop_id) {
                    flag = true
                }
            })
            if (flag) {
                // update
                newReports = state.reports.map(r => {
                    if (r.shop && r.shop.shop_id === action.payload.shop.shop_id) {
                        return action.payload
                    } else {
                        return r
                    }
                })
            } else {
                // add

                newReports = [...state.reports, action.payload]
            }

            return { ...state, reports: newReports };
        default:
            return state;
    }
}

const zone = "Australia/Sydney"

const initState = {
    shops: [],
    date: {
        startDate: moment.utc()
            .add("minutes", zone)
            .startOf("day"),
        endDate: moment.utc()
            .endOf("day")
            .add("minutes", zone)
    },
    reports: [],
    loadingShops: [],
    source: "",
}

export default (props) => {
    const mapState = useCallback(({ refeshAxiosToken }) => ({ refeshAxiosToken }))
    const { refeshAxiosToken } = useMappedState(mapState)
    const appDispatch = useDispatch()
    const [state, dispatch] = useReducer(reducer, initState)

    const { shops, date: { startDate, endDate }, reports, loadingShops, source } = state

    const getTotalSales = () => {
        return reports.reduce((sum, report) => {
            return sum + parseFloat(report.totalSales || 0)
        }, 0);
    }


    const getTotalTx = () => {
        return reports.reduce((sum, report) => sum + parseInt(report.totalTx || 0), 0);
    }

    useEffect(() => {
        const fn = async () => {
            dispatch({
                type: "REFRESH_AXIOS_TOKEN"
            })
            let shops = await localStorage.getItem('aupos_online_report_customer_user_shops')
            if (shops) {
                dispatch({
                    type: 'SET',
                    payload: { shops: JSON.parse(shops) }
                })
            }

        }

        fn()

    }, [])

    useEffect(() => {
        if (source && source !== "") {
            appDispatch({
                type: 'setSource',
                payload: source
            })
        }
    }, [source])

    useEffect(() => {
        if (refeshAxiosToken) {
            dispatch({
                type: "REFRESH_AXIOS_TOKEN"
            })
            appDispatch({
                type: "SET_RefeshAxiosToken",
                payload: false
            })
        }

    }, [refeshAxiosToken])

    return (
        <CustomerReportSumaryCtx.Provider value={[state, dispatch]}>
            <>
                <CancelRequestNotification />
                <Header show={true} hideNavBar={true} {...props} />

                <div className={'date-picker margin-top'} style={{ position: 'relative' }}>
                    {loadingShops.length > 0 && <div
                        style={{
                            position: 'absolute',
                            height: '100%',
                            width: 'calc(100% - 2rem)',
                            zIndex: '99000',
                            backgroundColor: 'transparent'
                        }}
                        onClick={() => {
                            appDispatch({ type: 'ShowCancelRequestNotification' })
                        }}
                    >

                    </div>}
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
                <div className={'component-total-report'}>
                    <div className="total-summary" style={{ marginTop: '1.5rem' }}>
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
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '1rem',
                        height: '70vh',
                        overflow: 'scroll'
                    }}>
                        <div className={'shop-list'} style={{ height: '101%' }}>
                            {shops.map((shop, index) => {
                                return (
                                    <ShopSummaryCard key={`customer-shop-summary-list-${index}`} source={source} shop={shop} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        </CustomerReportSumaryCtx.Provider>
    )
}