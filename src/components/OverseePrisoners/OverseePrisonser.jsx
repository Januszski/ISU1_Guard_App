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
    // <div className='min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
    //   {/* Concrete texture background */}
    //   <div
    //     className='absolute inset-0 z-0'
    //     style={{
    //       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C9C9C' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
    //       backgroundSize: "4px 4px",
    //     }}
    //   ></div>

    //   {/* Prison bars overlay */}
    //   <div className='absolute inset-0 z-10 pointer-events-none'>
    //     {[...Array(20)].map((_, i) => (
    //       <div
    //         key={i}
    //         className='absolute top-0 bottom-0 w-0.5 bg-gray-800 opacity-20'
    //         style={{ left: `${i * 5}%`, transform: "skew(-5deg)" }}
    //       ></div>
    //     ))}
    //   </div>

    //   {/* Spotlight effect */}
    //   <div
    //     className='absolute top-0 left-1/4 w-1/2 h-1/2 bg-yellow-400 rounded-full opacity-5 blur-3xl z-0'
    //     style={{ transform: "translateY(-30%)" }}
    //   ></div>

    <div>{prisonerSelected === "" ? <PrisonerGrid /> : <PrisonerInfo />}</div>
    // </div>
  );
}

export default OverseePrisonser;
