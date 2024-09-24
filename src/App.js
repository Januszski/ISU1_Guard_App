import logo from "./logo.svg";
import "./App.css";

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
import { setupDatabase } from "./utils/dbSetup";
import { invoke } from "@tauri-apps/api/core";
import WardenSignIn from "components/WardenSignIn";
import SignedOut from "components/SignedOut";

// require("dotenv").config();

function App() {
  const [buttonSelected, setButtonSelected] = useAtom(headerButtonAtom);
  // @ts-ignore
  // const invoke = window.__TAURI__.core.invoke;

  // const a = invoke("greet", { name: "balls" }).then((response) =>
  //   console.log(response)
  // );
  // console.log("A ", a);

  // invoke("my_custom_command");

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
