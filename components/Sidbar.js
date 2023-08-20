import React, { useState, useRef, useEffect } from "react";

import { Fullscreen, Brightness4, FlagCircle, Save } from "@mui/icons-material";

export default function SideBarTools({
  toggleDark,
  toggleFullScreen,
  showModal,
  setShowModal,
  showModalFile,
  setShowModalFile,
}) {
  return (
    <div className={`absolute h-screen left-0 flex flex-col`}>
      <button onClick={() => toggleFullScreen()}>
        <Fullscreen className="text-4xl" />
      </button>
      <button onClick={() => toggleDark()}>
        <Brightness4 className="text-4xl" />
      </button>
      <button onClick={() => setShowModal(true)}>
        <FlagCircle className="text-4xl" />
      </button>
      <button onClick={() => setShowModalFile(true)}>
        <Save className="text-4xl" />
      </button>
    </div>
  );
}
