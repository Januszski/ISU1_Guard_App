import "./App.css";
import Header from "./components/Header";
import React from "react";
import { useAtom } from "jotai";
import { headerButtonAtom } from "./atom";
import ManageCellsPage from "components/ManageCells/ManageCellsPage";
import OverseePrisonser from "components/OverseePrisoners/OverseePrisonser";
import CameraMonitoring from "components/ViewCameras/CameraMonitoring";
import Inbox from "components/ViewMessages/Inbox";
import WardenSignIn from "components/WardenSignIn";
import SignedOut from "components/SignedOut";

function App() {
  const [buttonSelected, setButtonSelected] = useAtom(headerButtonAtom);
  // @ts-ignore

  return (
    <div className='App'>
      <Header />
      {buttonSelected === "cells" && <ManageCellsPage />}
      {buttonSelected === "prisoners" && <OverseePrisonser />}
      {buttonSelected === "cameras" && <CameraMonitoring />}
      {buttonSelected === "inbox" && <Inbox />}
      {buttonSelected === "signin" && <WardenSignIn />}
      {buttonSelected === "signedout" && <SignedOut />}
    </div>
  );
}

export default App;
