import React, { useEffect } from "react";
import { useState } from "react";
import ViewPrisoners from "./ViewPrisoners";
import { lockCellDb, unlockCellDb } from "repo/cellsRepo";

const PrisonButton = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`
        px-4 py-2 text-sm font-bold rounded-md transition-all duration-100
        ${
          isActive
            ? "text-white bg-gradient-to-b from-gray-700 to-gray-800 border-2 border-gray-600 shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_0_0_1px_rgba(0,0,0,0.8)]"
            : "text-gray-400 bg-gradient-to-b from-gray-500 to-gray-600 border-2 border-gray-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(0,0,0,0.5)]"
        }
        hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default function Component({ cellId, cellNumber, isOpen, prisonBreak }) {
  const [isLocked, setIsLocked] = useState(!isOpen);

  useEffect(() => {
    if (prisonBreak) {
      setIsLocked(false);
    }
  }, [prisonBreak]);

  const CellBars = ({ isLocked }) => (
    <div
      className={`absolute inset-0 w-full transition-transform duration-1000 ease-in-out ${
        isLocked ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern
            id='cell-bars'
            x='0'
            y='0'
            width='20'
            height='100%'
            patternUnits='userSpaceOnUse'
          >
            <rect width='4' height='100%' fill='#333' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#cell-bars)' />
      </svg>
    </div>
  );

  return (
    <div className='bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg shadow-lg overflow-hidden min-w-min'>
      {/* Cell interior */}
      <div className='relative h-52 bg-gradient-to-b from-gray-600 to-gray-700 p-4'>
        <CellBars isLocked={isLocked} />
        <div className='relative z-10 h-full flex flex-col justify-between'>
          <div className='text-gray-300 text-lg font-bold'>
            Cell {cellNumber}
          </div>
        </div>
      </div>

      {/* Control panel */}
      <div className='bg-gray-800 p-4'>
        <div className='flex justify-between space-x-2'>
          <PrisonButton
            label='Lock'
            isActive={isLocked}
            onClick={async () => {
              lockCellDb(cellId);
              setIsLocked(true);
            }}
          />
          <ViewPrisoners cellId={cellId} />
          <PrisonButton
            label='Unlock'
            isActive={!isLocked}
            onClick={async () => {
              unlockCellDb(cellId);
              setIsLocked(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
