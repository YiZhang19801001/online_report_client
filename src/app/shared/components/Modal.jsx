import React, { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

export default () => {
  const mapState = useCallback(({ showModal }) => ({ showModal }));
  const { showModal } = useMappedState(mapState);
  const dispatch = useDispatch();
  if (!showModal) {
    return null;
  }
  return (
    <div className="component-modal">
      <i
        className="material-icons"
        onClick={() => {
          dispatch({ type: "closeModal" });
        }}
      >
        not_interested
      </i>
      <img src="/Spinner.svg" alt="" />
    </div>
  );
};
