import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CellCard from "./CellCard";
import { useEffect, useState } from "react";
import { getAllCellsDb, unlockCellDb } from "repo/cellsRepo";
import { signedInAtom } from "../../atom";
import { useAtom } from "jotai";
import { Store } from "@tauri-apps/plugin-store";

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

const store = new Store("store.bin");

export default function BasicGrid() {
  const [cells, setCells] = useState([]);
  const [error, setError] = useState(null);
  const [signedIn, setSignedIn] = useAtom(signedInAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchCells = async () => {
    try {
      const result = await getAllCellsDb();
      setCells(result);
      const signedIn = await store.get("session");
      if (signedIn) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    } catch (err) {
      setError("Error fetching cells: " + err.message);
    }
  };

  useEffect(() => {
    fetchCells();

    const intervalId = setInterval(fetchCells, 20000);

    return () => clearInterval(intervalId);
  }, []);

  const handleUnlockAllCellsAndShowFlag = async () => {
    try {
      const updatedCells = await Promise.all(
        cells.map(async (cell) => {
          await unlockCellDb(cell.id);
          return { ...cell, opened: true };
        })
      );

      setCells([...updatedCells]);
    } catch (err) {
      console.error("Error unlocking cells: ", err);
    } finally {
      setIsDialogOpen(true);
    }
  };

  const handleOpenDialog = async () => {
    await handleUnlockAllCellsAndShowFlag();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {signedIn && (
        <Button //you MUST have this button and it MUST show flag when clicked
          variant='contained'
          sx={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            marginBottom: "20px",
            "&:hover": {
              backgroundColor: "darkred",
            },
          }}
          onClick={handleOpenDialog}
        >
          {" FREE ALL PRISONERS FOREVER (stakeholders will NOT be happy) "}
        </Button>
      )}

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
            {(
              <CellCard
                cellId={cell?.id}
                cellNumber={cell?.cell_number}
                isOpen={cell?.opened}
                prisonBreak={isDialogOpen}
              />
            ) || error}
          </Box>
        ))}
      </Box>

      {/* Dialog to show the text message */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{"Important Notice"}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
              color: "red",
            }}
          >
            {"You have unleashed all the prisoners! Prepare for chaos!"}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
