import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CellCard from "./CellCard";
import Database from "@tauri-apps/plugin-sql";
import { useEffect, useState } from "react";

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

const mockArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
];

export default function BasicGrid() {
  const [cells, setCells] = useState([]);
  const [error, setError] = useState(null);

  const fetchCells = async () => {
    try {
      const db = await Database.load(
        "mysql://warden:password@localhost/iseage_test1"
      );
      // const result = await db.execute("SELECT 1");
      const result = await db.select("SELECT * from cells");

      // const result = await db.execute(
      //   "INSERT INTO prisoners (firstname, lastname, sentence_start, sentence_end, crime, notes) VALUES (?, ?, ?, ?, ?, ?)",
      //   [
      //     "John",
      //     "Doe",
      //     "2023-01-15",
      //     "2025-01-15",
      //     "Robbery",
      //     "Serves time in Cell 1",
      //   ]
      // );
      console.log("RESULT ", result);
      setCells(result);
    } catch (err) {
      setError("Error fetching cells: " + err.message);
    }
  };

  useEffect(() => {
    console.log("HERE");
    // Fetch cells when the component mounts
    fetchCells();

    // Set up an interval to refetch cells every 10 seconds (10000 milliseconds)
    const intervalId = setInterval(fetchCells, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center the entire box
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allow cards to wrap to the next row
          justifyContent: "flex-start", // Align cards to the left within the centered box
          maxWidth: "1200px", // Centered box with max width
          width: "100%",
        }}
      >
        {cells.map((cell) => (
          <Box
            key={cell.id}
            sx={{
              flex: "1 1 calc(25% - 16px)", // Make each card take up 25% of the container with margin
              margin: "20px", // Add some margin between the cards
              // minWidth: "200px", // Ensure a minimum width for the cards
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
