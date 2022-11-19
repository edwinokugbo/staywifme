import axios from "axios";
import React, { useState, useEffect } from "react";

function MySettings() {
  const [message, setMessage] = useState("");

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex flex-col items-center w-full md:w-2/3 lg:w-2/3 bg-white border-slate-300 rounded-md shadow-sm mx-4 px-4 py-8">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-2">Settings</h2>
        </div>
      </div>
    </div>
  );
}

export default MySettings;
