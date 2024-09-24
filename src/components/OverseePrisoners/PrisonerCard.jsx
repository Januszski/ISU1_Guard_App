import { Avatar } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { orange, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import { useAtom } from "jotai";
import { currentPrisonerIdAtom } from "../../atom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const PrisonerCard = ({ prisoner, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [prisonerSelected, setPrisonerSelected] = useAtom(
    currentPrisonerIdAtom
  );

  const handleClick = () => {
    setPrisonerSelected(prisoner.id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 25); // Stagger the animation

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`
          bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg
          transform transition-all duration-500 ease-out
          ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
        `}
    >
      <div className='p-4 space-y-2'>
        <div className='flex items-center space-x-4'>
          <Avatar sx={{ bgcolor: grey[900], color: orange[600] }}>
            <PersonIcon />
          </Avatar>

          <div>
            <h3 className='text-lg font-bold text-gray-100'>
              {prisoner?.firstname} {prisoner?.lastname}
            </h3>
            <span className='text-xs font-mono text-gray-400'>
              ID: {prisoner?.id}
            </span>
          </div>
        </div>
        <p className='text-sm text-gray-400'>{prisoner.crime}</p>
        <p className='text-xs text-gray-500'>
          <CalendarTodayIcon style={{ marginRight: "8px" }} />
          {prisoner.sentence_start} - {prisoner.sentence_end}
        </p>
      </div>
      <div className='bg-gray-900 p-2 flex justify-between'>
        <h3 className='text-base font-bold text-gray-100'></h3>

        <PrisonButton label='Profile' onClick={handleClick} />
      </div>
    </div>
  );
};

const PrisonButton = ({ label, onClick }) => (
  <button
    className={`
        px-2 py-1 text-xs font-bold rounded
        transition-all duration-100
        text-gray-300 bg-gradient-to-b from-gray-700 to-gray-800 border border-gray-600
        hover:from-red-600 hover:to-red-700
        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
      `}
    onClick={onClick}
  >
    {label}
  </button>
);

export default PrisonerCard;
