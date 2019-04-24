import React, { useState } from "react";
import axios from "axios";
import { history } from "../shared";
export default () => {
  const labels = { app_name: "online report" }; //!fake data
  const [formValues, setFormValues] = useState({
    name: "",
    password: "",
    remember_me: false
  });

  const handleInputChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (formValues.name === "" || formValues.password === "") {
      return false;
    }
    axios.post(`http://localhost:8000/api/auth/login`, formValues).then(res => {
      localStorage.setItem(
        "aupos_online_report_user",
        JSON.stringify(res.data)
      );
      history.push(`${process.env.PUBLIC_URL}/daily`);
    });
  };
  const handleChecked = e => {
    setFormValues({ ...formValues, remember_me: e.target.checked });
  };
  return (
    <div className="component-login">
      <div className="header">{labels.app_name}</div>
      <form onSubmit={handleFormSubmit}>
        <div className="form-field">
          <label htmlFor="name" className="text-label">
            username
          </label>
          <input
            type="text"
            placeholder="enter username"
            value={formValues.name}
            name="name"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password" className="text-label">
            password
          </label>
          <input
            type="password"
            placeholder="enter password"
            value={formValues.password}
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field checkbox">
          <input
            name="remember_me"
            type="checkbox"
            checked={formValues.remember_me}
            onChange={handleChecked}
          />
          <label htmlFor="remember_me" className="checkbox-label">
            remember_me
          </label>
        </div>
        <div className="button-container">
          <button>confirm</button>
        </div>
      </form>
    </div>
  );
};
