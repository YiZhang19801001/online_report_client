import React, { useCallback, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useMappedState, useDispatch } from "redux-react-hook";
import { history } from "../history";

const reducer = (state, action) => {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    case "setFormValues":
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload }
      };
    case "setErrs":
      return {
        ...state,
        errs: { ...state.errs, ...action.payload }
      };
    default:
      return state;
  }
};

const initState = {
  showForm: fase,
  formValues: {
    password: "",
    repeatPassword: ""
  },
  errs: {
    password: "",
    repeatPassword: ""
  }
};

export default () => {
  const mapState = useCallback(({ showUserCenter }) => ({ showUserCenter }));
  const { showUserCenter } = useMappedState(mapState);
  const g_dispatch = useDispatch();
  if (!showUserCenter) {
    return null;
  }

  const [state, dispatch] = useReducer(reducer, initState);

  const { showForm, formValues, errs } = state;
  const { password, repeatPassword } = formValues;

  const onSubmit = e => {
    e.preventDefault();
    if (password === "") {
      dispatch({
        type: "setErrs",
        payload: { password: "password is required" }
      });
    }

    if (repeatPassword === "") {
      dispatch({
        type: "setErrs",
        payload: { repeatPassword: "repeat password is required" }
      });
    }

    if (password !== repeatPassword) {
      dispatch({
        type: "setErrs",
        payload: { repeatPassword: "password not matched" }
      });
    }

    if (errs.password !== "" || errs.repeatPassword !== "") {
      return false;
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
        {showForm && (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={password}
              onChange={e => {
                dispatch({
                  type: "setFormValues",
                  paylaod: { password: e.target.value }
                });
              }}
            />
            <input
              type="text"
              value={repeatPassword}
              onChange={e => {
                dispatch({
                  type: "setFormValues",
                  paylaod: { repeatPassword: e.target.value }
                });
              }}
            />
            <button className="button-save">save change</button>
          </form>
        )}
      </div>
      <button
        onClick={e => {
          e.preventDefault();
          g_dispatch({ type: "closeUserCenter" });
        }}
        className={`button-close`}
      >
        close
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          localStorage.removeItem("aupos_online_report_user");
          g_dispatch({ type: "closeUserCenter" });
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
