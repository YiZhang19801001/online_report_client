import React, { useCallback } from "react";
import Routes from "./routes";
import { useMappedState } from "redux-react-hook";
import { checkLogin } from "./shared/hooks";
import { Modal, history, UserModal } from "./shared/";
import refreshPNG from "../images/refresh.png"


import "./App.css";
export default () => {
  checkLogin(history.location.pathname);
  const mapState = useCallback(
    ({ showModal, showUserCenter, showCancelNotification }) => ({
      showModal,
      showUserCenter, showCancelNotification
    }),
    []
  );

  const { showModal, showUserCenter, showCancelNotification } = useMappedState(mapState);

  return (
    <div
      className={`app ${showModal ? "blur" : ""} ${
        showUserCenter ? "blur" : ""
        } ${
        showCancelNotification ? "blur" : ""
        }`}
    >
      <Modal />
      <UserModal />
      <Routes />
      <RefreshButton />
    </div>
  );
};


const RefreshButton = () => {

  return <div style={{
    position: 'fixed',
    height: '3rem',
    width: '3rem',
    left: '1rem',
    bottom: '2rem',
    borderRadius: '50%',
    overflow: 'hidden',
    zIndex: 5,
    opacity: '0.5',
    boxShadow: '0 0 10px #4a4a4a6b'
  }}
    onClick={() => {
      window.location.reload()
    }}
  >
    <img src={refreshPNG} style={{
      height: '100%',
      width: '100%',
      opacity: '0.7'
    }} alt="" />
  </div>
}