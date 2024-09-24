import { currentPrisonerIdAtom } from "../../atom";
import { useAtom } from "jotai";
import React from "react";
import PrisonerGrid from "./PrisonerGrid";
import PrisonerInfo from "./PrisonerInfo";

function OverseePrisonser() {
  const [prisonerSelected, setPrisonerSelected] = useAtom(
    currentPrisonerIdAtom
  );

  return (
    <div>{prisonerSelected === "" ? <PrisonerGrid /> : <PrisonerInfo />}</div>
  );
}

export default OverseePrisonser;
