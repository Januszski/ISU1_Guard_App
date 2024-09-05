import { headerButtonAtom } from "../atom";
import { useAtom } from "jotai";
import React from "react";
import { useState } from "react";

export default function Component({ buttonLabel }) {
  const [isPressed, setIsPressed] = useState(false);
  const [buttonSelected, setButtonSelected] = useAtom(headerButtonAtom);

  const handleClick = () => {
    setButtonSelected(buttonLabel);
  };

  return (
    <button
      className={`
        relative
        px-3 py-1.5
        text-sm font-bold text-gray-200
        ${
          buttonSelected === buttonLabel
            ? "bg-gradient-to-b from-gray-600 to-gray-700"
            : "bg-gradient-to-b from-gray-300 to-gray-400"
        }
        border-4 border-gray-800
        rounded-md
        shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_0_0_1px_rgba(0,0,0,0.8),0_3px_0_4px_rgba(0,0,0,0.5)]
        transition-all duration-100
        ${
          isPressed
            ? "translate-y-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(0,0,0,0.8)]"
            : ""
        }
      `}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
    >
      <span className='relative z-10'>
        {buttonLabel === "cells" && "Manage Cells"}
        {buttonLabel === "prisoners" && "Oversee Prisoners"}
        {buttonLabel === "cameras" && "View Cameras"}
      </span>
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-md'></div>
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMzMzIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-20 rounded-md"></div> */}
    </button>
  );
}
