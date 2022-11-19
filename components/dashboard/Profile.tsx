import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import Personal from "./profile/Personal";

function Profile() {
  const [message, setMessage] = useState("");
  const [currentProfile, setCurrentProfile] = useState(1);

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex flex-col items-center w-full md:w-2/3 lg:w-2/3 bg-white border-slate-300 rounded-md shadow-sm mx-4 px-4 py-8">
        <div className="w-full mb-4 text-slate-700">
          <h2 className="text-xl font-bold">My Profile</h2>
        </div>
        <div className="w-full flex justify-between">
          <button
            className={`w-full border-2 border-slate-200 hover:bg-slate-200 py-1 ${
              currentProfile == 1 ? "bg-slate-300" : ""
            }`}
            onClick={() => setCurrentProfile(1)}
          >
            Personal
          </button>
          <button
            className={`w-full border-2 border-slate-200 hover:bg-slate-200 py-1 ${
              currentProfile == 2 ? "bg-slate-300" : ""
            }`}
            onClick={() => setCurrentProfile(2)}
          >
            Education
          </button>
          <button
            className={`w-full border-2 border-slate-200 hover:bg-slate-200 py-1 ${
              currentProfile == 3 ? "bg-slate-300" : ""
            }`}
            onClick={() => setCurrentProfile(3)}
          >
            Work
          </button>
          <button
            className={`w-full border-2 border-slate-200 hover:bg-slate-200 py-1 ${
              currentProfile == 4 ? "bg-slate-300" : ""
            }`}
            onClick={() => setCurrentProfile(4)}
          >
            Social
          </button>
        </div>
        <div className="w-full">{currentProfile == 1 && <Personal />}</div>
      </div>
    </div>
  );
}

export default Profile;
