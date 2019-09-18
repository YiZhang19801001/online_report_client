import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../shared/constants";

export default (date,dispatch) => {
    const { startDate, endDate } = date;

    const [data, setData] = useState([]);
    useEffect(() => {
        dispatch({ type: "setState", payload: { isLoading: true } });
        axios
            .get(
                `${apiUrl}/tourgroup?`, {
                params: {
                    startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
                    endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
                },

                headers: {
                    Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("aupos_online_report_user"))
                            .access_token
                        }`
                }
            }
            )
            .then(res => {
                setData(res.data.groupIds);
                dispatch({ type: "setState", payload: { isLoading: false } });
                console.log(res)
            });
    }, [date]);

    return data;
};
