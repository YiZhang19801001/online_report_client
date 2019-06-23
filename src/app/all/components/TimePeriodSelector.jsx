import React, { useCallback } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
export default () => {
  const mapState = useCallback(({ dateStart, dateEnd }) => ({
    dateStart,
    dateEnd
  }));

  const { dateEnd, dateStart } = useMappedState(mapState);

  const dispatch = useDispatch();

  return (
    <div className="flat-block">
      <span className="title">select period</span>
      <div className="container">
        <input
          type="date"
          value={dateStart}
          onChange={e => {
            dispatch({ type: "setDateStart", payload: e.target.value });
          }}
        />
        <input
          type="date"
          value={dateEnd}
          onChange={e =>
            dispatch({ type: "setDateEnd", payload: e.target.value })
          }
        />
      </div>
    </div>
  );
};
