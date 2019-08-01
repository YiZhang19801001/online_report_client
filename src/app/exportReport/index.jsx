import React, { useReducer } from 'react';
import { Header } from "../shared";
import moment from 'moment';

const reducer = (state, action) => {
    switch (action.type) {
        case 'setState':

            return { ...state, ...action.payload };

        default:
            return state;
    }
}

const initState = {
    monthValue: moment().format('YYYY-MM')
}


export default (props) => {


    const [state, dispatch] = useReducer(reducer, initState);

    const { monthValue } = state;



    return <>
        <Header show={true} {...props} />

        <div className={`component-export-report`} style={{ height: 'calc(100vh - 9rem)' }}>
            <div className={`calendar-section`}>
                <label htmlFor="monthly-picker">
                    <i className={`material-icons`}>
                        calendar_today
                    </i>
                    Change Month
                </label>
                <input value={monthValue} style={{ opacity: 0 }} type="month" id="monthly-picker" onChange={e => {
                    dispatch({ type: 'setState', payload: { monthValue: e.target.value } })
                }} />
            </div>
            <div className={`month-display`}>
                <div className={`calendar-page`}>
                    <div className={`year`}>
                        {moment(monthValue).format('YYYY')}
                    </div>
                    <div className={`month`}>
                        {moment(monthValue).format('MM')}
                    </div>
                </div>
            </div>
            <div className={`button-container`}>
                <button className={`button-download`}>
                    <i className={`material-icons`}>
                        cloud_download
                    </i>
                    download
                </button>
            </div>
        </div>
    </>
}