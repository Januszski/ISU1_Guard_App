import logo from "./logo.svg";
import "./App.css";

import { invoke } from "@tauri-apps/api";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { headerButtonAtom } from "./atom";
import CellGrid from "components/ManageCells/CellGrid";
import ManageCellsPage from "components/ManageCells/ManageCellsPage";
import PrisonerGrid from "components/OverseePrisoners/PrisonerGrid";
import OverseePrisonser from "components/OverseePrisoners/OverseePrisonser";
import CameraMonitoring from "components/ViewCameras/CameraMonitoring";
import Inbox from "components/ViewMessages/Inbox";

function App() {
  invoke("greet", { name: "whatever" }).then((response) =>
    console.log(response)
  );
  const [buttonSelected, setButtonSelected] = useAtom(headerButtonAtom);

  return (
    <div className='App'>
      <Header />
      {buttonSelected === "cells" && <ManageCellsPage />}
      {buttonSelected === "prisoners" && <OverseePrisonser />}
      {buttonSelected === "cameras" && <CameraMonitoring />}
      {buttonSelected === "inbox" && <Inbox />}
    </div>
  );
}

export default App;
