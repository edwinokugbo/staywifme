import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import { Settings } from "../../constants/Settings";

const ageRange = () => {
  let numArr = [];
  for (let i = 18; i < 121; i++) {
    numArr.push(i);
  }
  return numArr;
};

function Search() {
  const [id, setID] = useState("");
  const [message, setMessage] = useState("");
  const age_range = ageRange();

  const searchNow = () => {
    axios
      .post(`${Settings.API_DATA_URL}register/signmeup`, {
        id: id,
      })
      .then((response) => {
        const status = response.data.status;
        const messg = response.data.message;
        const uid = response.data.uid;
        if (status === "available") {
          setMessage("");
          Router.push(`/signup/${uid}`);
        } else {
          setMessage(messg);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("");
      });
  };

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="flex flex-col items-center w-full md:w-2/3 lg:w-2/3 bg-white border-slate-300 rounded-md shadow-sm mx-4 px-4 py-8">
        <p className="mb-4 text-slate-700">
          Use our intelligent search tool to filter your search for a partner.
          Happy search.
        </p>
        <div className="w-full py-4">
          <h2 className="text-lg font-bold">Type of Relationshp</h2>
          <select
            name="relationship"
            id=""
            className="w-full mt-2 p-2 border-2 border-slate-200"
          >
            <option value="gist">A Gist partner</option>
            <option value="friend">A friend/Companion</option>
            <option value="long-term">Long Term Relationship</option>
            <option value="marriage">Possible Marriage</option>
          </select>
        </div>
        <div className="w-full py-4">
          <h2 className="text-lg font-bold">
            Age Range{" "}
            <span className="text-sm text-slate-700 text-normal italic">
              (Select age range)
            </span>
          </h2>
          <div className="grid grid-cols-2 gap-5">
            <select
              name="start_age"
              className="w-full mt-2 p-2 border-2 border-slate-200"
            >
              {age_range.map((age) => {
                return <option value={age}>{age}</option>;
              })}
            </select>
            <select
              name="start_age"
              className="w-full mt-2 p-2 border-2 border-slate-200"
            >
              {age_range.map((age) => {
                return <option value={age}>{age}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="w-full py-4">
          <h2 className="text-lg font-bold">Location</h2>
          <input
            type="text"
            name="location"
            placeholder="Partner Location"
            className="border-simple px-2 py-2 rounded-md w-full lg:w-full mb-4"
            onChange={(e) => setID(e.target.value)}
          />
        </div>
        <div className="w-full py-4">
          <h2 className="text-lg font-bold">Education</h2>
          <select
            name="education"
            id=""
            className="w-full mt-2 p-2 border-2 border-slate-200"
          >
            <option value="all">Not Important</option>
            <option value="secondary-school">Secondary School</option>
            <option value="under-graduate">University (Under Graduate)</option>
            <option value="long-graduate">University (Graduate)</option>
            <option value="post-graduate">University (Post Graduate)</option>
          </select>
        </div>
        <div className="w-full py-4">
          <h2 className="text-lg font-bold">Work Status</h2>
          <select
            name="work_status"
            id=""
            className="w-full mt-2 p-2 border-2 border-slate-200"
          >
            <option value="all">All</option>
            <option value="student">Student</option>
            <option value="unemployed">Unemployed</option>
            <option value="employee">Corporate Employee</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="profesional">Skilled Professional</option>
          </select>
        </div>
        <p className="w-full text-red-600 text-right italic">{message}</p>
        <button
          className="w-full bg-accent text-white border-2 border-greyish py-1 rounded-md"
          onClick={searchNow}
        >
          Go!
        </button>
      </div>
    </div>
  );
}

export default Search;
