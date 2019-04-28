import React, { useCallback } from "react";
import Routes from "./routes";
import { useMappedState } from "redux-react-hook";
import { checkLogin } from "./shared/hooks";
import { Modal } from "./shared/";
import "./App.css";
export default () => {

  checkLogin();

  const mapState = useCallback(({ showModal }) => ({ showModal }), []);

  const { showModal } = useMappedState(mapState);


  return (
    <div className={`app ${showModal ? 'blur' : ''}`}>
      <Modal />
      <Routes />
    </div>
  );
};
