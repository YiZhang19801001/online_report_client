import React, { useState, useReducer, useEffect } from 'react'
import comment from '../../pictures/comment.png';
import { fetchGroupList, fetchReports } from "../hooks";
import { Loading } from "../../shared";


const colorRange = ['#755ce0', '#4a7ee1', '#6352ab', '#5268ca', '#897fcc', '#6d8dd8', '#755ce0', '#4a7ee1', '#6352ab', '#5268ca', '#897fcc', '#6d8dd8'];

const reducer = (state, action) => {
    switch (action.type) {
        case "setState":
            return { ...state, ...action.payload };
        default:
            break;
    }
};

const initState = {
    isLoading: false,
};

export default function GroupSummary(props) {
    const { drawer, setDrawer, date } = props;
    const [state, dispatch] = useReducer(reducer, initState);
    const { isLoading } = state;
    const [group, setGroup] = useState('');
    const groupList = fetchGroupList(date, dispatch);
    const reports = fetchReports(date, dispatch, group, 'group');
    const [top, setTop] = useState('');


    return (
        <div className="component-total-report" onScroll={() => setDrawer('')}>
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <select onChange={(e) => setGroup(e.target.value)}>
                    <option value="">{!isLoading ? 'Choose Your Group' : `Loading Groups`}</option>
                    {
                        groupList && groupList.map(g => <option key={g.group_id} value={g.group_id}>{g.group_name}</option>)
                    }
                </select>
            </div>
            {isLoading && <Loading />}
            {(group !== '' && reports.groupSummary) &&
                <>
                    <div className="total-summary" style={{ marginTop: '1rem' }}>
                        <div className="total-summary__sales" style={{ height: "7.5rem", justifyContent: 'space-between' }}>
                            <div className="title">Total Sales:</div>
                            <div className="value font-weight" style={{ marginTop: '0.4rem' }}>
                                ${reports.groupSummary.totalSales.toFixed(2)}
                            </div>
                            <div className={`all-pax`}>
                                <span>All/PAX</span>
                                <span>${reports.groupSummary.avg.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className={"group-summary"} style={{ justifyContent: 'space-between', width: '11.8rem', maxHeight: '7.5rem', minHeight: '7.5rem' }}>
                            <div className={`group-title`} style={{ overflow: 'visible' }}>
                                <div className={`route`}>Route</div>
                                <div className="name">{reports.groupSummary.description}</div>
                            </div>
                            <div className={`group-title margin-top`} style={{ alignItems: 'center' }}>
                                <div className={`route`}>Leader</div>
                                <div className={`name`}>{reports.groupSummary.tour_leader}</div>
                            </div>
                            <div className={`bottom-container`}>
                                <span className={`number`}>{reports.groupSummary.pax}</span>
                                <span className={`text`}>PAX</span>
                            </div>
                        </div>
                    </div>
                    <div className={`group-table`}>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#4a4a4a', color: 'white' }}>SHOP</th>
                                    <th>Date</th>
                                    <th>Guide</th>
                                    <th>ALL/APX</th>
                                    <th>Sale</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reports.reports.filter(r => r.sale !== 0).map((r, i) => {
                                        return (
                                            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '' : '#f6f5f9' }}>
                                                <td id={r.shopName} style={{ backgroundColor: `${colorRange[i]}` }} onClick={(e) => { setDrawer(r.shopName); setTop(e.target.getBoundingClientRect().top + 'px') }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        {r.comments && <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                                            {drawer === r.shopName &&
                                                                <div style={{ overflow: 'visible' }}>
                                                                    <div className={`popup`} style={{ left: '4rem', top: top }}>
                                                                        <div className={`popup-header`}>
                                                                            <span className={`comment`}>Comments</span>
                                                                            <span className={`name`}>{r.shopName}</span>
                                                                        </div>
                                                                        <span className={`content`}>{r.comments}</span>
                                                                        <div className={`popup-footer`}>
                                                                            <span onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setDrawer('')
                                                                            }} className={`close`}>Close</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <img src={comment} alt='comment' />
                                                        </div>}
                                                        <div className={`shop-name-container`}>
                                                            <span className={`shop-name`}>{r.shopName}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ width: "4rem" }}>
                                                    {r.date.substring(0, 10) || '无'}
                                                </td>
                                                <td style={{ width: '4rem' }}>
                                                    {r.guide}
                                                </td>
                                                <td>
                                                    ${r.avg.toFixed(2)}
                                                </td>
                                                <td style={{ width: '5rem' }}>
                                                    ${parseFloat(r.sale).toFixed(2)}
                                                </td>
                                                <td>
                                                    <span className={`download-text`}>Profit rpt</span>
                                                </td>
                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    )
}
