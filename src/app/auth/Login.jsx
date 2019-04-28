import React, { useReducer } from "react";
import axios from "axios";
import { Form, history } from "../shared";

const loginReducer = (success = false, action) => {
  switch (action.type) {
    case "login": // handle login
      axios
        .post(`http://localhost:8000/api/auth/login`, action.payload)
        .then(res => {
          localStorage.setItem(
            "aupos_online_report_user",
            JSON.stringify(res.data)
          );
          history.push(`${process.env.PUBLIC_URL}/daily`);
        });
      return true;
    default:
      // default/initial reducers
      return success;
  }
};

export default () => {
  const [success, dispatch] = useReducer(loginReducer, false);
  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "enter username",
      labelText: "username"
    },
    {
      name: "password",
      type: "password",
      placeholder: "enter password",
      labelText: "password"
    }
  ];
  return (
    <div className="component-login">

      <div className="header"><div className="cover"></div><span className="login-title">Onlie Reports</span></div>
      <Form fields={fields} dispatch={dispatch} />
    </div>
  );
};
