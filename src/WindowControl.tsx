import React from "react";
import {
  MinusIcon,
  Square2StackIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function WindowControl() {
  const handleMinimize = () => window.electron.minimize();

  const handleMaximize = () => window.electron.maximize();

  const handleClose = () => window.electron.close();

  return (
    <div
      className="flex md:gap-6 sm:gap-3 lg:gap-8 fixed top-[14px] right-2 "
      style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
    >
      <div
        onClick={handleMinimize}
        className="p-1 
       w-8 h-8 hover:bg-gray-200 hover:text-[#081f3f] rounded-full fill-current text-white"
      >
        <MinusIcon />
      </div>
      <div
        onClick={handleMaximize}
        className="p-1  hover:bg-gray-200 hover:text-[#081f3f] rounded-full  w-8 h-8"
      >
        <Square2StackIcon />
      </div>
      <div
        onClick={handleClose}
        className="p-1 hover:bg-red-500 w-8 h-8 rounded-full"
      >
        <XMarkIcon />
      </div>
    </div>
  );
}

export default WindowControl;
