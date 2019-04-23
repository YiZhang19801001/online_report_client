import React, { useState } from "react";
import axios from "axios";
export default () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    remember_me: false
  });

  const handleInputChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/auth/login`, formValues).then(res => {
      localStorage.setItem(
        "aupos_online_report_user",
        JSON.stringify(res.data)
      );
    });
  };
  const handleChecked = e => {
    setFormValues({ ...formValues, remember_me: e.target.checked });
  };
  return (
    <div className="component-login">
      <form onSubmit={handleFormSubmit}>
        <div className="form-field">
          <input
            type="text"
            placeholder="enter email"
            value={formValues.email}
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <input
            type="password"
            placeholder="enter password"
            value={formValues.password}
            name="password"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
          <input
            type="checkbox"
            checked={formValues.remember_me}
            onChange={handleChecked}
          />
        </div>
        <div className="button-container">
          <button>confirm</button>
        </div>
      </form>
    </div>
  );
};
