import React, { useReducer } from "react";
import axios from "axios";
import { Form, history } from "../shared";
import { apiUrl } from "../shared/constants";

const loginReducer = (success = false, action) => {
  switch (action.type) {
    case "login": // handle login
      axios
        .post(`${apiUrl}/auth/login`, action.payload)
        .then(res => {
          localStorage.setItem(
            "aupos_online_report_user",
            JSON.stringify(res.data)
          );
          if (res.data.shops.length > 1 || res.data.user_type === 'HEAD') {
            history.push(`${process.env.PUBLIC_URL}/total`);
          } else {
            history.push(`${process.env.PUBLIC_URL}/daily`);
          }
        })
        .catch(err => {
          alert(`password incorrect`);
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
      <div className="header">
        <div className="cover" />
        <span className="login-title">Online Reports</span>
      </div>
      <Form fields={fields} dispatch={dispatch} />
    </div>
  );
};
