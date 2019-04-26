import React, { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import { dispatch } from "rxjs/internal/observable/range";

export default () => {
  const mapState = useCallback(({ showModal }) => ({ showModal }));
  const { showModal } = useMappedState(mapState);
  const dispatch = useDispatch();
  if (!showModal) {
    return null;
  }
  return (
    <div
      className="component-modal"
      onClick={() => {
        dispatch({ type: "closeModal" });
      }}
    >
      <img src="/Spinner.svg" alt="" />
    </div>
  );
};
