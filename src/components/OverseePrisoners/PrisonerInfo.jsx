// @ts-nocheck

import { useEffect, useState } from "react";
import { Calendar, Edit3, Save } from "lucide-react";
import React from "react";
import { orange, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Button } from "@mui/material";
import { useAtom } from "jotai";
import { currentPrisonerIdAtom } from "../../atom";
import {
  getCellNameFromPrisonerIdDb,
  getCellIdFromCellNameDb,
  movePrisonerInCellDb,
} from "repo/cellsRepo";
import { getPrisonerDb } from "repo/prisonerRepo";
import { Snackbar, Alert } from "@mui/material";
import { updatePrisonerNotesDb } from "repo/prisonerRepo";

export default function Component() {
  const [prisoner, setPrisoner] = useState({});

  const [newCell, setNewCell] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [prisonerIdSelected, setPrisonerIdSelected] = useAtom(
    currentPrisonerIdAtom
  );
  const [currentPrisonerInfo, setCurrentPrisonerInfo] = useState();
  const [currentCell, setCurrentCell] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    async function fetchPrisonerById() {
      const result = await getPrisonerDb(prisonerIdSelected);

      const cell = await getCellNameFromPrisonerIdDb(prisonerIdSelected);

      setCurrentCell(cell);

      setCurrentPrisonerInfo(result[0]);

      return result;
    }

    fetchPrisonerById();
  }, [prisonerIdSelected]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCellAssignment = async () => {
    try {
      const cellIdFromCellNumber = await getCellIdFromCellNameDb(newCell);

      if (cellIdFromCellNumber.length === 0) {
        setNotification({
          message: `Cell with name ${newCell} not found`,
          type: "error",
        });
        setOpen(true);
        return;
      }

      const cellId = cellIdFromCellNumber[0].id;
      const updateResult = await movePrisonerInCellDb(
        cellId,
        prisonerIdSelected
      );

      if (updateResult.rowsAffected === 0) {
        setNotification({
          message: `No rows affected. Maybe the prisoner_id ${prisonerIdSelected} does not exist?`,
          type: "error",
        });
        setOpen(true);
        return;
      }

      setNotification({
        message: "Prisoner cell updated successfully",
        type: "success",
      });
      setOpen(true);
      setCurrentCell([{ cell_number: newCell }]);
    } catch (error) {
      setNotification({
        message: `An error occurred: ${error.message}`,
        type: "error",
      });
      setOpen(true);
    }
  };

  const handleNotesEdit = async () => {
    if (editingNotes) {
      console.log("SAVING NOTES");
      await updatePrisonerNotesDb(
        prisonerIdSelected,
        currentPrisonerInfo.notes
      );
    }
    setEditingNotes(!editingNotes);
  };

  const handleNotesChange = (e) => {
    setCurrentPrisonerInfo({ ...currentPrisonerInfo, notes: e.target.value });
  };

  const handleBackButtonClick = () => {
    console.log("Back button clicked");
    setPrisonerIdSelected("");
    // Add any other logic you want to execute when the button is clicked
  };

  if (!prisoner) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={notification.type}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <div className='min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden'>
          <div className='flex items-center'>
            <Button
              variant='text'
              sx={{
                "&:hover": {
                  color: "darkred", // Optional: darken the color on hover
                },
                color: "red", // Text color
              }}
              onClick={handleBackButtonClick}
            >
              {"< "}Back
            </Button>
          </div>
          <div className='md:flex'>
            <div className='md:flex-shrink-0 ml-9 m-t-4'>
              {/* <div className='h-48 w-full md:w-48 bg-gray-700 flex items-center justify-center overflow-hidden'> */}
              <Avatar
                sx={{
                  bgcolor: grey[900],
                  color: orange[600],
                  width: 200,
                  height: 200,
                }}
              >
                <PersonIcon sx={{ width: 200, height: 200 }} />
              </Avatar>
              {/* </div> */}
            </div>
            <div className='p-8 w-full'>
              <div className='uppercase tracking-wide text-sm text-gray-400 font-semibold'>
                Prisoner ID:{" "}
                {
                  // @ts-ignore
                  currentPrisonerInfo?.id
                }
              </div>
              <h1 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white'>
                {currentPrisonerInfo?.firstname} {currentPrisonerInfo?.lastname}
              </h1>
              <p className='mt-2 text-xl text-gray-300'>
                {currentPrisonerInfo?.crime}
              </p>

              <div className='mt-4 flex flex-wrap justify-center gap-4'>
                <div className='flex items-center text-gray-400'>
                  <Calendar className='h-5 w-5 mr-2' />
                  <span>Start: {currentPrisonerInfo?.sentence_start}</span>
                </div>
                <div className='flex items-center text-gray-400'>
                  <Calendar className='h-5 w-5 mr-2' />
                  <span>End: {currentPrisonerInfo?.sentence_end}</span>
                </div>
              </div>

              <div className='mt-4'>
                <h2 className='text-xl font-bold text-white'>Current Cell</h2>
                <p className='text-gray-300'>{currentCell[0]?.cell_number}</p>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-700 p-8'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              Assign New Cell
            </h2>
            <div className='flex gap-4'>
              <input
                type='text'
                value={newCell}
                onChange={(e) => setNewCell(e.target.value)}
                placeholder='Enter new cell assignment'
                className='flex-grow px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500'
              />
              <button
                onClick={handleCellAssignment}
                // style={{ background: "#F37D3D" }}
                className='px-4 py-2 text-white bg-[#F37D3D] rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800'
              >
                Assign
              </button>
            </div>
          </div>

          <div className='border-t border-gray-700 p-8'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold text-white'>Notes</h2>
              <Button
                onClick={handleNotesEdit}
                variant='outlined'
                sx={{
                  color: "white",
                  borderColor: "gray",
                  "&:hover": {
                    borderColor: "lightgray",
                    backgroundColor: "#444",
                  },
                }}
                startIcon={editingNotes ? <Save /> : <Edit3 />}
              >
                {editingNotes ? "Save" : "Edit"}
              </Button>
            </div>

            {/* Textbox for editing or displaying notes */}
            <div className='bg-gray-700 rounded-md p-3 min-h-[150px]'>
              {editingNotes ? (
                <textarea
                  value={currentPrisonerInfo?.notes}
                  onChange={handleNotesChange}
                  placeholder='Enter notes here...'
                  className='w-full h-full bg-gray-600 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none block'
                  rows={6}
                  style={{ minHeight: "150px" }} // Ensures stable height
                />
              ) : (
                <p
                  className='text-gray-300 whitespace-pre-wrap'
                  style={{ minHeight: "150px" }}
                >
                  {currentPrisonerInfo?.notes || "No notes available."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
