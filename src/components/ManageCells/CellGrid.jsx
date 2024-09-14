import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CellCard from "./CellCard";
import Database from "@tauri-apps/plugin-sql";
import { useEffect, useState } from "react";
import { getAllCellsDb } from "repo/cellsRepo";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function BasicGrid() {
  const [cells, setCells] = useState([]);
  const [error, setError] = useState(null);

  const fetchCells = async () => {
    try {
      const result = await getAllCellsDb();
      setCells(result);
    } catch (err) {
      setError("Error fetching cells: " + err.message);
    }
  };

  useEffect(() => {
    fetchCells();

    const intervalId = setInterval(fetchCells, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        {cells.map((cell) => (
          <Box
            key={cell.id}
            sx={{
              flex: "1 1 calc(25% - 16px)",
              margin: "20px",
            }}
          >
            <CellCard
              cellId={cell.id}
              cellNumber={cell.cell_number}
              isOpen={cell.opened}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
