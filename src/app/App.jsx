import React, { useCallback } from "react";
import Routes from "./routes";
import { useMappedState } from "redux-react-hook";
import { checkLogin } from "./shared/hooks";
import { Modal, history, UserModal } from "./shared/";

import "./App.css";
export default () => {
  checkLogin(history.location.pathname);
  const mapState = useCallback(
    ({ showModal, showUserCenter }) => ({
      showModal,
      showUserCenter
    }),
    []
  );

  const { showModal, showUserCenter } = useMappedState(mapState);

  return (
    <div
      className={`app ${showModal ? "blur" : ""} ${
        showUserCenter ? "blur" : ""
        }`}
    >
      <Modal />
      <UserModal />
      <Routes />
    </div>
  );
};
