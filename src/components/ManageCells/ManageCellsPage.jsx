import React from "react";
import CellGrid from "./CellGrid";
import Background from "../../public/CellPageBackground.jpg";

function ManageCellsPage() {
  return (
    <>
      <div style={{ backgroundImage: `url(${Background})` }}>
        <CellGrid />
      </div>
    </>
  );
}

export default ManageCellsPage;
