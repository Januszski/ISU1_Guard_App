// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Calendar, Edit3, Save } from "lucide-react";
import React from "react";
import { blue, orange, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Button } from "@mui/material";
import { useAtom } from "jotai";
import { currentPrisonerIdAtom } from "../../atom";
import Database from "@tauri-apps/plugin-sql";

export default function Component() {
  const [prisoner, setPrisoner] = useState({
    id: 1001,
    name: "John Doe",
    crime: "Cybercrime",
    sentenceStart: "2022-01-15",
    sentenceEnd: "2027-01-15",
    currentCell: "Block A, Cell 101",
    notes: "Exhibits good behavior. Participates in prison education program.",
  });

  const [newCell, setNewCell] = useState("");
  const [editingNotes, setEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(prisoner.notes);
  const [prisonerIdSelected, setPrisonerIdSelected] = useAtom(
    currentPrisonerIdAtom
  );
  const [currentPrisonerInfo, setCurrentPrisonerInfo] = useState();
  const [currentCell, setCurrentCell] = useState("");

  useEffect(() => {
    async function fetchPrisonerById() {
      const db = await Database.load(
        "mysql://warden:password@localhost/iseage_test1"
      );

      // Query to get all information about the prisoner with the given ID
      const result = await db.select("SELECT * FROM prisoners WHERE id = ?", [
        prisonerIdSelected,
      ]);

      const cell = await db.select(
        "SELECT c.cell_number FROM cells c JOIN prisoner_cells pc ON c.id = pc.cell_id WHERE pc.prisoner_id = ?",
        [prisonerIdSelected]
      );

      console.log("Cell for this prisoner ", currentCell);

      setCurrentCell(cell);
      console.log("PRISONER SELECTED ", result);

      setCurrentPrisonerInfo(result[0]);

      return result;
    }

    fetchPrisonerById();
  }, [prisonerIdSelected]);

  const handleCellAssignment = async () => {
    const db = await Database.load(
      "mysql://warden:password@localhost/iseage_test1"
    );

    const cellIdFromCellNumber = await db.select(
      "SELECT id FROM cells WHERE cell_number = ?",
      [newCell]
    );
    if (cellIdFromCellNumber.length === 0) {
      throw new Error(`Cell with number ${newCell} not found`);
    }

    const cellId = cellIdFromCellNumber[0].id;

    const updateResult = await db.execute(
      "UPDATE prisoner_cells SET cell_id = ? WHERE prisoner_id = ?",
      [cellId, prisonerIdSelected]
    );
    if (updateResult.rowsAffected === 0) {
      throw new Error(
        `No rows affected. Maybe the prisoner_id ${prisonerIdSelected} does not exist?`
      );
    }

    console.log("Prisoner cell updated successfully");
    setCurrentCell([{ cell_number: newCell }]);
  };

  const handleNotesEdit = () => {
    setEditingNotes(!editingNotes);
  };

  const handleNotesChange = (e) => {
    setPrisoner({ ...prisoner, notes: e.target.value });
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
            <div className='md:flex-shrink-0'>
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
                className='flex-grow px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button
                onClick={handleCellAssignment}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
              >
                Assign
              </button>
            </div>
          </div>

          <div className='border-t border-gray-700 p-8'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold text-white'>Notes</h2>
              <button
                onClick={handleNotesEdit}
                className='flex items-center px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out'
              >
                {editingNotes ? (
                  <Save className='h-4 w-4 mr-2' />
                ) : (
                  <Edit3 className='h-4 w-4 mr-2' />
                )}
                {editingNotes ? "Save" : "Edit"}
              </button>
            </div>
            <div className='bg-gray-700 rounded-md p-3 min-h-[100px]'>
              {editingNotes ? (
                <textarea
                  value={prisoner.notes}
                  onChange={handleNotesChange}
                  className='w-full h-full bg-transparent text-white focus:outline-none resize-none'
                />
              ) : (
                <p className='text-gray-300 whitespace-pre-wrap'>
                  {prisoner.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
