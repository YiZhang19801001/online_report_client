import React, { useReducer, useState, useEffect } from 'react'
import { Loading } from "../../shared";
import { AgentSummaryCard, GroupSummaryCard } from './index';
import { uniqueId } from "lodash";
import { fetchGroupList, fetchReports } from "../hooks";
const reducer = (state, action) => {
    switch (action.type) {
        case "setState":
            return { ...state, ...action.payload };
        default:
            break;
    }
};

const initState = {
    isLoading: true,
};
export default function AgentSummary(props) {
    const { date, showAgent, setShowAgent } = props;
    const [state, dispatch] = useReducer(reducer, initState);
    const { isLoading } = state;
    const [agentName, setAgentName] = useState('');
    const reports = fetchReports(date, dispatch, '', 'agent');
    
    const agentReports = fetchReports(date, dispatch, '', 'agent', agentName);
    const agentList = Object.keys(reports);
    const isdisplay = ()=>{
        if(reports){
            console.log(Object.keys(reports))
            if(Object.keys(reports).length>0)return true;
            return false;
        }
        return false;
    }

    return (
        <>
        {isLoading && <Loading />}
        <div className="component-total-report" style={{display:isdisplay()?'':'none'}}>
            {showAgent&&<div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column',minHeight:'2rem'}}>
                <select value={agentName} onChange={(e)=>{setAgentName(e.target.value)}}>
                    {agentList.map(a=><option value={a} key={a}>{a}</option>)}
                </select>
            </div>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
                <div className="shop-list" style={{marginTop:'0'}}>
                    {!showAgent && reports && Object.keys(reports).map((k) => {
                        return (
                            <AgentSummaryCard report={reports[k]} name={k} key={uniqueId("shopSummary")} setShowAgent={setShowAgent} setAgentName={setAgentName} />
                        );
                    })}
                    {
                        showAgent && agentReports && 
                        Object.keys(reports[agentName].reports).map((k)=>{
                            console.log(k)
                            return (
                                <GroupSummaryCard report={reports[agentName].reports[k]} name={k} key={uniqueId("shopSummary")}/>
                            )
                        })
                    }

                </div>
            </div>
        </div>
        </>
    )
}
