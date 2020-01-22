import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { useMappedState, useDispatch } from "redux-react-hook";

export default () => {
    const mapState = useCallback(({ showCancelNotification, source }) => ({ showCancelNotification, source }));
    const { showCancelNotification, source } = useMappedState(mapState);
    const dispatch = useDispatch();
    if (!showCancelNotification) {
        return null;
    }

    const cancel = () => {
        source.cancel('canceled')
        dispatch({ type: "closeCancelNotificationCenter" })
        dispatch({
            type: "SET_RefeshAxiosToken",
            payload: true
        })
    }

    return ReactDOM.createPortal(
        <div className="component-modal">
            <i
                className="material-icons"
                onClick={() => {
                    dispatch({ type: "closeCancelNotificationCenter" });
                }}
            >
                not_interested
      </i>
            <div style={{
                width: "80%",

                padding: "1rem 2rem",
                fontSize: "0.75rem",
                color: "#4a4a4a"
            }}>
                if date changed, all uncompeleted store reports will be canceled
      </div>
            <button
                onClick={e => {
                    e.preventDefault();
                    dispatch({ type: "closeCancelNotificationCenter" });

                }}
                className={`button-close`}
                style={{ width: `${200 / 16}rem` }}
            >
                close
            </button>
            <button
                onClick={e => {
                    e.preventDefault();
                    cancel()
                }}
                className={`button-logout`}
                style={{ width: `${200 / 16}rem` }}
            >
                continue changing date
            </button>
        </div>,
        document.querySelector("#modal")
    );
};
