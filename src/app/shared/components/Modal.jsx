import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { useMappedState, useDispatch } from "redux-react-hook";

export default () => {
  const mapState = useCallback(({ showModal }) => ({ showModal }));
  const { showModal } = useMappedState(mapState);
  const dispatch = useDispatch();
  if (!showModal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="component-modal">
      <i
        className="material-icons"
        onClick={() => {
          dispatch({ type: "closeModal" });
        }}
      >
        not_interested
      </i>
      <img src="http://kidsnparty.com.au/report/Spinner.svg" alt="" />
    </div>,
    document.querySelector("#modal")
  );
};
