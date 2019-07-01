import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useMappedState, useDispatch } from "redux-react-hook";
import { apiUrl } from "../constants";
import { history } from "../history";

export default () => {
  const mapState = useCallback(
    ({ showUserCenter, userResetPassword }) => ({
      showUserCenter,
      userResetPassword
    }),
    []
  );

  const { showUserCenter, userResetPassword } = useMappedState(mapState);

  const dispatch = useDispatch();
  if (!showUserCenter) {
    return null;
  }

  const { valid, formValues, errs } = userResetPassword;
  const { password, repeatPW } = formValues;

  const onSubmit = e => {
    e.preventDefault();
    let hasErrs = false;
    if (password === "") {
      hasErrs = true;
      dispatch({
        type: "setUserRestPasswordErrs",
        payload: { password: "password is required" }
      });
    }

    if (repeatPW === "") {
      hasErrs = true;
      dispatch({
        type: "setUserRestPasswordErrs",
        payload: { repeatPW: "repeat password is required" }
      });
    }

    if (password !== repeatPW) {
      hasErrs = true;
      dispatch({
        type: "setUserRestPasswordErrs",
        payload: { repeatPW: "password not matched" }
      });
    }

    if (hasErrs) {
      return;
    } else {
      axios
        .post(`${apiUrl}/password`, formValues)
        .then(resp => {
          dispatch({ type: "setState", payload: { showForm: false } });
        })
        .catch(errs => {
          console.log("update password fail: ", errs);
        });
    }
  };

  return ReactDOM.createPortal(
    <div className="component-modal">
      <div className={`new-password`}>
        {valid && (
          <form onSubmit={onSubmit} className={`reset-password-form`}>
            <div className={`intro`}>
              you can only change your password <b>once</b>. <br />
              if you want to change your password again, you have to call our
              staff to reset your password first
            </div>
            <div className={`form-field`}>
              <input
                type="password"
                value={password}
                name={`password`}
                onChange={e => {
                  dispatch({
                    type: "setUserRestPasswordFormValues",
                    payload: { password: e.target.value }
                  });
                }}
              />
              <label
                name={`password`}
                htmlFor="password"
                className={password !== "" ? "input-not-empty" : ""}
              >
                new password
              </label>
            </div>
            <div className={`form-field`}>
              <input
                type="password"
                value={repeatPW}
                name={`repeatPW`}
                onChange={e => {
                  dispatch({
                    type: "setUserRestPasswordFormValues",
                    payload: { repeatPW: e.target.value }
                  });
                }}
              />
              <label
                name={`repeatPw`}
                htmlFor="repeatPW"
                className={repeatPW !== "" ? "input-not-empty" : ""}
              >
                repeat password{" "}
                {errs.repeatPW !== "" ? ": " + errs.repeatPW : ""}
              </label>
            </div>
            <button className="button-save">save change</button>
          </form>
        )}
      </div>
      <button
        onClick={e => {
          e.preventDefault();
          dispatch({ type: "closeUserCenter" });
          dispatch({
            type: "resetUserRestPassword"
          });
        }}
        className={`button-close`}
      >
        close
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          localStorage.removeItem("aupos_online_report_user");
          dispatch({ type: "closeUserCenter" });
          history.push(`${process.env.PUBLIC_URL}/login`);
        }}
        className={`button-logout`}
      >
        logout
      </button>
    </div>,
    document.querySelector("#modal")
  );
};
