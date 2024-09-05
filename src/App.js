import logo from "./logo.svg";
import "./App.css";

import { invoke } from "@tauri-apps/api";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { headerButtonAtom } from "./atom";
import CellGrid from "components/ManageCells/CellGrid";
import ManageCellsPage from "components/ManageCells/ManageCellsPage";

function App() {
  invoke("greet", { name: "whatever" }).then((response) =>
    console.log(response)
  );
  const [buttonSelected, setButtonSelected] = useAtom(headerButtonAtom);

  return (
    <div className='App'>
      <Header />
      {buttonSelected === "cells" && <ManageCellsPage />}
    </div>
  );
}

export default App;
